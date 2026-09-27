"""
SIPER API Middleware Layer
Auth → RBAC → Case-scope → Validation helpers used by the REST router.
"""
from typing import Any, Dict, List, Optional, Tuple

from .auth import get_session, has_permission, ROLE_PERMISSIONS
from .database import get_db

# Public endpoints that do not require a Bearer session
PUBLIC_PATHS = {
    ("POST", "/auth/login"),
    ("POST", "/auth/verify-2fa"),
}

# Permission aliases so AUDITOR read-only roles can access view endpoints
PERMISSION_ALIASES: Dict[str, List[str]] = {
    "view_cases": ["view_cases", "view_cases_read_only"],
    "search_entities": ["search_entities", "search_entities_read_only"],
    "view_entity_profile": ["view_entity_profile", "view_entity_profile_read_only"],
    "view_findings": ["view_findings", "view_findings_read_only"],
    "view_evidence": ["view_evidence", "view_evidence_read_only"],
    "edit_assigned_case": ["edit_assigned_case", "edit_all_cases"],
    "delete_case": ["delete_case", "edit_all_cases"],
    "view_all_audit": ["view_all_audit", "view_own_audit", "export_audit"],
}


def qparam(query_params: Dict[str, Any], key: str, default: Optional[str] = None) -> Optional[str]:
    """Extract first value from parse_qs-style query dict."""
    values = query_params.get(key)
    if not values:
        return default
    if isinstance(values, list):
        return values[0] if values else default
    return str(values)


def normalize_body(body_data: Optional[Dict[str, Any]]) -> Dict[str, Any]:
    """Normalize common camelCase / snake_case payload aliases."""
    data = dict(body_data or {})
    aliases = [
        ("entity_id", "entityId"),
        ("source_id", "sourceId"),
        ("target_id", "targetId"),
        ("case_id", "caseId"),
        ("finding_ids", "findingIds"),
        ("entity_ids", "entityIds"),
        ("challenge_id", "challengeId"),
    ]
    for snake, camel in aliases:
        if snake not in data and camel in data:
            data[snake] = data[camel]
    return data


def resolve_auth(
    method: str,
    rel_path: str,
    auth_header: Optional[str],
) -> Tuple[Optional[Dict[str, Any]], Optional[Tuple[int, Dict[str, Any]]]]:
    """
    Auth middleware.
    Returns (session_user, None) on success, or (None, (status, error_body)) on failure.
    """
    if (method, rel_path) in PUBLIC_PATHS:
        return None, None

    token = None
    if auth_header:
        token = auth_header.replace("Bearer ", "").strip()

    session = get_session(token) if token else None
    if not session:
        return None, (401, {"success": False, "message": "Authentication required. Please sign in."})

    # Normalize id key used across controllers
    user = dict(session)
    if "user_id" not in user and "id" in user:
        user["user_id"] = user["id"]
    return user, None


def check_permission(user: Dict[str, Any], permission: str) -> Optional[Tuple[int, Dict[str, Any]]]:
    """RBAC middleware. Returns None if allowed, else (403, body)."""
    role = user.get("role", "")
    allowed = PERMISSION_ALIASES.get(permission, [permission])
    if any(has_permission(role, p) for p in allowed):
        return None
    return (
        403,
        {
            "success": False,
            "message": f"Role '{role}' is not permitted to perform '{permission}'.",
            "required_permission": permission,
            "role_permissions": ROLE_PERMISSIONS.get(role, []),
        },
    )


def resolve_case_id(
    case_id: Optional[str],
    *,
    required: bool = False,
    allow_demo_default: bool = False,
) -> Tuple[Optional[str], Optional[Tuple[int, Dict[str, Any]]]]:
    """
    Case-scope middleware.
    Validates case exists when provided. Optionally requires case_id.
    Demo default CASE-26189 only when allow_demo_default=True and case_id omitted.
    """
    cid = (case_id or "").strip() if case_id else ""

    if not cid:
        if required and not allow_demo_default:
            return None, (400, {"success": False, "message": "case_id is required for this operation."})
        if allow_demo_default:
            cid = "CASE-26189"
        else:
            return None, None

    conn = get_db()
    try:
        row = conn.execute("SELECT id, title, status FROM cases WHERE id = ?", (cid,)).fetchone()
        if not row:
            return None, (404, {"success": False, "message": f"Case '{cid}' not found."})
        return cid, None
    finally:
        conn.close()


def get_shell_summary(active_case_id: Optional[str] = None) -> Dict[str, Any]:
    """Aggregate queries powering AppShell badges and active-scope widget."""
    conn = get_db()
    try:
        active_cases = conn.execute(
            "SELECT COUNT(*) AS c FROM cases WHERE status = 'ACTIVE'"
        ).fetchone()["c"]
        new_findings = conn.execute(
            """
            SELECT COUNT(*) AS c FROM findings
            WHERE UPPER(status) IN ('NEW', 'PENDING', 'UNVERIFIED', 'OPEN')
            """
        ).fetchone()["c"]

        # Prefer requested case, else most recently updated active case
        case_row = None
        if active_case_id:
            case_row = conn.execute(
                "SELECT * FROM cases WHERE id = ?", (active_case_id,)
            ).fetchone()
        if not case_row:
            case_row = conn.execute(
                """
                SELECT * FROM cases
                WHERE status = 'ACTIVE'
                ORDER BY updated_at DESC
                LIMIT 1
                """
            ).fetchone()
        if not case_row:
            case_row = conn.execute(
                "SELECT * FROM cases ORDER BY updated_at DESC LIMIT 1"
            ).fetchone()

        scope = {
            "case_id": None,
            "title": "No Active Case",
            "entity_count": 0,
            "edge_count": 0,
            "findings_count": 0,
        }

        if case_row:
            cid = case_row["id"]
            entity_count = conn.execute(
                "SELECT COUNT(DISTINCT entity_id) AS c FROM case_entities WHERE case_id = ?",
                (cid,),
            ).fetchone()["c"]
            edge_count = conn.execute(
                """
                SELECT COUNT(*) AS c FROM relationships r
                WHERE r.source_id IN (SELECT entity_id FROM case_entities WHERE case_id = ?)
                  AND r.target_id IN (SELECT entity_id FROM case_entities WHERE case_id = ?)
                """,
                (cid, cid),
            ).fetchone()["c"]
            findings_count = conn.execute(
                "SELECT COUNT(*) AS c FROM findings WHERE case_id = ?",
                (cid,),
            ).fetchone()["c"]
            scope = {
                "case_id": cid,
                "title": case_row["title"],
                "status": case_row["status"],
                "priority": case_row["priority"],
                "entity_count": entity_count,
                "edge_count": edge_count,
                "findings_count": findings_count,
            }

        return {
            "badges": {
                "active_cases": active_cases,
                "new_findings": new_findings,
            },
            "active_scope": scope,
        }
    finally:
        conn.close()


def unified_search(query: str, kinds: Optional[List[str]] = None, limit: int = 40) -> Dict[str, Any]:
    """UNION search across entities, cases, documents, and findings."""
    q = (query or "").strip()
    if not q:
        return {"results": [], "count": 0, "query": q}

    kind_set = set(k.lower() for k in (kinds or ["entity", "case", "document", "finding"]))
    like = f"%{q}%"
    results: List[Dict[str, Any]] = []
    conn = get_db()
    try:
        if "entity" in kind_set or "entities" in kind_set:
            rows = conn.execute(
                """
                SELECT id, canonical_name AS title, type AS subtitle, risk_level AS meta, 'entity' AS kind
                FROM entities
                WHERE canonical_name LIKE ? OR aliases LIKE ? OR identifiers LIKE ?
                ORDER BY risk_score DESC
                LIMIT ?
                """,
                (like, like, like, limit),
            ).fetchall()
            results.extend([dict(r) for r in rows])

        if "case" in kind_set or "cases" in kind_set:
            rows = conn.execute(
                """
                SELECT id, title, status AS subtitle, priority AS meta, 'case' AS kind
                FROM cases
                WHERE title LIKE ? OR id LIKE ? OR description LIKE ?
                ORDER BY updated_at DESC
                LIMIT ?
                """,
                (like, like, like, limit),
            ).fetchall()
            results.extend([dict(r) for r in rows])

        if "document" in kind_set or "documents" in kind_set:
            rows = conn.execute(
                """
                SELECT id, title, source_category AS subtitle, case_id AS meta, 'document' AS kind
                FROM documents
                WHERE title LIKE ? OR raw_text LIKE ? OR id LIKE ?
                ORDER BY timestamp DESC
                LIMIT ?
                """,
                (like, like, like, limit),
            ).fetchall()
            results.extend([dict(r) for r in rows])

        if "finding" in kind_set or "findings" in kind_set:
            rows = conn.execute(
                """
                SELECT id, title, type AS subtitle, severity AS meta, 'finding' AS kind
                FROM findings
                WHERE title LIKE ? OR type LIKE ? OR id LIKE ?
                ORDER BY confidence DESC
                LIMIT ?
                """,
                (like, like, like, limit),
            ).fetchall()
            results.extend([dict(r) for r in rows])
    finally:
        conn.close()

    return {"results": results[:limit], "count": min(len(results), limit), "query": q}
