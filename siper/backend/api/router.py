"""
SIPER REST API Router & Controllers
Dispatches all REST API endpoints under /api/v1 with Auth → RBAC → Case-scope → Validation → Audit.
"""
import json
import time
import secrets
from typing import Dict, Any, Tuple, Optional

from ..core.config import API_PREFIX, ROLES
from ..core.auth import (
    get_session, create_session, initiate_2fa, verify_2fa_otp,
    invalidate_session, has_permission, hash_password, ROLE_PERMISSIONS
)
from ..core.audit import log_audit_event, get_audit_events
from ..core.database import get_db
from ..core.graph import (
    get_graph_data, expand_entity_neighborhood, find_shortest_path,
    compute_graph_metrics, export_cytoscape_json, export_graphml_xml
)
from ..core.entity_resolver import (
    get_pending_resolution_candidates, resolve_candidate, run_entity_resolution_scan
)
from ..core.pattern_detector import run_all_pattern_detectors
from ..core.document_processor import (
    process_uploaded_document, get_all_documents, get_document_with_spans
)
from ..core.report_generator import generate_intelligence_report, get_all_reports, get_report_by_id
from ..core.middleware import (
    resolve_auth, check_permission, resolve_case_id, normalize_body,
    qparam, get_shell_summary, unified_search
)

def handle_api_request(
    method: str,
    path: str,
    query_params: Dict[str, Any],
    body_data: Optional[Dict[str, Any]],
    auth_header: Optional[str],
    client_ip: str = "127.0.0.1"
) -> Tuple[int, Dict[str, Any]]:
    """Dispatch incoming API request through middleware then to controllers."""
    rel_path = path[len(API_PREFIX):] if path.startswith(API_PREFIX) else path
    body_data = normalize_body(body_data)

    # ---- Auth middleware ----
    current_user, auth_err = resolve_auth(method, rel_path, auth_header)
    if auth_err:
        return auth_err

    # For public auth routes, current_user may be None until login succeeds
    if current_user is None:
        current_user = {
            "user_id": "usr_anon",
            "name": "Anonymous Operator",
            "role": "INVESTIGATOR",
            "email": "investigator@siper.gov.in"
        }

    def require(permission: str):
        return check_permission(current_user, permission)

    # -------------------------------------------------------------
    # 1. AUTH ENDPOINTS
    # -------------------------------------------------------------
    if rel_path == "/auth/login" and method == "POST":
        email = (body_data or {}).get("email", "").strip()
        password = (body_data or {}).get("password", "")
        
        conn = get_db()
        user = conn.execute("SELECT * FROM users WHERE email = ? AND active = 1", (email,)).fetchone()
        conn.close()

        if not user:
            # Fallback check for demo
            if email == "investigator@siper.gov.in":
                user = {"id": "usr_001", "email": email, "name": "Investigator-7", "role": "INVESTIGATOR", "badge_number": "NCRB-INV-26189", "unit": "Special Intelligence Wing"}
            else:
                return 401, {"success": False, "message": "Invalid email or password."}
        else:
            user = dict(user)

        # Initiate 2FA challenge
        challenge = initiate_2fa(user)
        log_audit_event(
            user["id"], user["name"], user["role"], "LOGIN_CHALLENGE_INITIATED",
            resource="AUTH_SYSTEM", details={"email": email}, ip_address=client_ip
        )
        return 200, {
            "success": True,
            "requires_2fa": True,
            "challenge_id": challenge["challenge_id"],
            "email": challenge["email"],
            "demo_otp_hint": challenge["demo_otp_hint"]
        }

    elif rel_path == "/auth/verify-2fa" and method == "POST":
        challenge_id = (body_data or {}).get("challenge_id", "")
        otp = (body_data or {}).get("otp", "")
        token = verify_2fa_otp(challenge_id, otp)
        
        if not token:
            return 401, {"success": False, "message": "Invalid or expired verification code."}
        
        sess = get_session(token)
        log_audit_event(
            sess["user_id"], sess["name"], sess["role"], "LOGIN_SUCCESS",
            resource="AUTH_SYSTEM", details={"auth_method": "2FA_VERIFIED"}, ip_address=client_ip
        )
        return 200, {
            "success": True,
            "token": token,
            "user": sess,
            "permissions": ROLE_PERMISSIONS.get(sess["role"], [])
        }

    elif rel_path == "/auth/me" and method == "GET":
        return 200, {
            "user": current_user,
            "permissions": ROLE_PERMISSIONS.get(current_user["role"], [])
        }

    elif rel_path == "/auth/switch-role" and method == "POST":
        # Interactive demo role switcher (requires existing session)
        target_role = (body_data or {}).get("role", "INVESTIGATOR")
        if target_role not in ROLES:
            return 400, {"success": False, "message": "Invalid role."}
        
        conn = get_db()
        u_row = conn.execute("SELECT * FROM users WHERE role = ? LIMIT 1", (target_role,)).fetchone()
        conn.close()

        if u_row:
            u_dict = dict(u_row)
        else:
            u_dict = {
                "id": f"usr_{target_role.lower()[:3]}",
                "email": f"{target_role.lower()}@siper.gov.in",
                "name": f"{target_role.capitalize()}-01",
                "role": target_role,
                "badge_number": f"NCRB-{target_role[:3]}-2026",
                "unit": "Operational Unit"
            }
        
        new_token = create_session(u_dict)
        log_audit_event(
            u_dict["id"], u_dict["name"], target_role, "SWITCH_ROLE",
            resource="RBAC_SYSTEM", details={"new_role": target_role}, ip_address=client_ip
        )
        return 200, {
            "success": True,
            "token": new_token,
            "user": u_dict,
            "permissions": ROLE_PERMISSIONS.get(target_role, [])
        }

    # -------------------------------------------------------------
    # 2. DASHBOARD ENDPOINTS
    # -------------------------------------------------------------
    elif rel_path == "/dashboard/kpis" and method == "GET":
        denied = require("view_dashboard")
        if denied:
            return denied
        conn = get_db()
        cases_count = conn.execute("SELECT COUNT(*) as count FROM cases WHERE status = 'ACTIVE'").fetchone()["count"]
        entities_count = conn.execute("SELECT COUNT(*) as count FROM entities WHERE status = 'ACTIVE'").fetchone()["count"]
        high_risk_count = conn.execute("SELECT COUNT(*) as count FROM entities WHERE risk_level = 'HIGH'").fetchone()["count"]
        patterns_count = conn.execute("SELECT COUNT(*) as count FROM findings").fetchone()["count"]
        conn.close()

        return 200, {
            "kpis": [
                {"id": "active_cases", "label": "Active Cases", "value": cases_count, "trend": "+1 this week", "trend_direction": "up", "icon": "folder_shared", "color": "text-primary"},
                {"id": "tracked_entities", "label": "Entities Tracked", "value": entities_count, "trend": "+12 new signals", "trend_direction": "up", "icon": "hub", "color": "text-emerald-400"},
                {"id": "high_risk", "label": "High-Risk Flags", "value": high_risk_count, "trend": "3 priority leads", "trend_direction": "warning", "icon": "warning", "color": "text-rose-400"},
                {"id": "patterns_detected", "label": "Patterns Detected", "value": patterns_count, "trend": "+2 ML cycles", "trend_direction": "up", "icon": "insights", "color": "text-amber-400"}
            ]
        }

    elif rel_path == "/dashboard/recent-cases" and method == "GET":
        denied = require("view_dashboard")
        if denied:
            return denied
        conn = get_db()
        rows = conn.execute("SELECT * FROM cases ORDER BY updated_at DESC LIMIT 5").fetchall()
        cases = []
        for r in rows:
            d = dict(r)
            d["assigned_investigators"] = json.loads(d["assigned_investigators"] or "[]")
            d["tags"] = json.loads(d["tags"] or "[]")
            cases.append(d)
        conn.close()
        return 200, {"cases": cases}

    elif rel_path == "/dashboard/recent-alerts" and method == "GET":
        denied = require("view_dashboard")
        if denied:
            return denied
        conn = get_db()
        rows = conn.execute("SELECT * FROM findings ORDER BY timestamp DESC LIMIT 6").fetchall()
        alerts = []
        for r in rows:
            d = dict(r)
            d["affected_entities"] = json.loads(d["affected_entities"] or "[]")
            d["reason_codes"] = json.loads(d["reason_codes"] or "[]")
            d["supporting_evidence"] = json.loads(d["supporting_evidence"] or "[]")
            alerts.append(d)
        conn.close()
        return 200, {"alerts": alerts}

    elif rel_path == "/dashboard/network-snapshot" and method == "GET":
        denied = require("view_dashboard")
        if denied:
            return denied
        graph_data = get_graph_data(max_nodes=15)
        return 200, graph_data

    elif rel_path == "/dashboard/shell-summary" and method == "GET":
        denied = require("view_dashboard")
        if denied:
            return denied
        case_id = qparam(query_params, "case_id")
        summary = get_shell_summary(active_case_id=case_id)
        return 200, summary

    elif rel_path == "/search" and method == "GET":
        denied = require("search_entities")
        if denied:
            return denied
        query = qparam(query_params, "q") or qparam(query_params, "query") or ""
        kinds_raw = qparam(query_params, "kinds") or "entity,case,document,finding"
        kinds = [k.strip() for k in kinds_raw.split(",") if k.strip()]
        limit = int(qparam(query_params, "limit") or "40")
        if not query.strip():
            return 400, {"success": False, "message": "Search query 'q' is required."}
        result = unified_search(query, kinds=kinds, limit=limit)
        log_audit_event(
            current_user["user_id"], current_user["name"], current_user["role"], "GLOBAL_SEARCH",
            resource="UNIFIED_SEARCH", details={"query": query, "count": result["count"]}, ip_address=client_ip
        )
        return 200, result

    # -------------------------------------------------------------
    # 3. CASES ENDPOINTS
    # -------------------------------------------------------------
    elif rel_path == "/cases" and method == "GET":
        denied = require("view_cases")
        if denied:
            return denied
        status_filter = qparam(query_params, "status")
        priority_filter = qparam(query_params, "priority")
        type_filter = qparam(query_params, "type") or qparam(query_params, "case_type")
        search = qparam(query_params, "search")

        conn = get_db()
        query = "SELECT * FROM cases WHERE 1=1"
        params = []

        if status_filter and status_filter != "ALL":
            if status_filter in ("UNDER_REVIEW", "UNDER INVESTIGATION"):
                query += " AND (status = 'UNDER_REVIEW' OR status = 'UNDER INVESTIGATION')"
            else:
                query += " AND status = ?"
                params.append(status_filter)

        if priority_filter and priority_filter != "ALL":
            query += " AND priority = ?"
            params.append(priority_filter)

        if type_filter and type_filter != "ALL":
            query += " AND (case_type = ? OR tags LIKE ?)"
            params.extend([type_filter, f"%{type_filter}%"])

        if search:
            s = f"%{search}%"
            # Support search by ID, title, description, case_type, owner, location, tags, or matching entity names
            query += """
                AND (
                    id LIKE ? OR title LIKE ? OR description LIKE ? OR case_type LIKE ?
                    OR owner LIKE ? OR location LIKE ? OR tags LIKE ?
                    OR id IN (
                        SELECT ce.case_id FROM case_entities ce
                        JOIN entities e ON ce.entity_id = e.id
                        WHERE e.canonical_name LIKE ? OR e.aliases LIKE ?
                    )
                )
            """
            params.extend([s, s, s, s, s, s, s, s, s])

        query += " ORDER BY updated_at DESC"
        rows = conn.execute(query, params).fetchall()

        # Compute dynamic KPI summary counts
        active_count = conn.execute("SELECT COUNT(*) as c FROM cases WHERE status = 'ACTIVE'").fetchone()["c"]
        closed_count = conn.execute("SELECT COUNT(*) as c FROM cases WHERE status = 'CLOSED'").fetchone()["c"]
        high_risk_count = conn.execute("SELECT COUNT(*) as c FROM cases WHERE priority IN ('CRITICAL', 'HIGH')").fetchone()["c"]
        total_count = conn.execute("SELECT COUNT(*) as c FROM cases").fetchone()["c"]

        cases = []
        for r in rows:
            d = dict(r)
            d["assigned_investigators"] = json.loads(d.get("assigned_investigators") or "[]")
            d["tags"] = json.loads(d.get("tags") or "[]")
            d["type"] = d.get("case_type") or "Organized Crime"
            d["case_type"] = d.get("case_type") or "Organized Crime"
            d["investigator"] = d.get("owner") or (d["assigned_investigators"][0] if d["assigned_investigators"] else "Investigator-7")
            d["location"] = d.get("location") or "National Jurisdiction"
            
            # Fetch dynamic entity count and findings count
            cid = d["id"]
            dyn_ecount = conn.execute("SELECT COUNT(DISTINCT entity_id) as c FROM case_entities WHERE case_id = ?", (cid,)).fetchone()["c"]
            dyn_fcount = conn.execute("SELECT COUNT(*) as c FROM findings WHERE case_id = ?", (cid,)).fetchone()["c"]
            d["entity_count"] = dyn_ecount if dyn_ecount > 0 else (d.get("entity_count") or 0)
            d["entities"] = d["entity_count"]
            d["findings_count"] = dyn_fcount if dyn_fcount > 0 else (d.get("findings_count") or 0)
            d["findings"] = d["findings_count"]
            cases.append(d)

        conn.close()
        return 200, {
            "cases": cases,
            "summary": {
                "active_cases": active_count,
                "closed_cases": closed_count,
                "high_risk_cases": high_risk_count,
                "total_cases": total_count
            }
        }

    elif rel_path == "/cases" and method == "POST":
        denied = require("create_case")
        if denied:
            return denied
        data = body_data or {}
        title = data.get("title", "").strip()
        if not title:
            return 400, {"success": False, "message": "Case title is required."}

        case_id = data.get("case_id") or data.get("id") or f"CASE-{secrets.randbelow(89999)+10000}"
        desc = data.get("description", "").strip()
        case_type = data.get("case_type") or data.get("type") or "Organized Crime"
        priority = data.get("priority", "HIGH").upper()
        owner = data.get("assigned_investigator") or data.get("owner") or current_user["name"]
        location = data.get("location", "National Jurisdiction").strip() or "National Jurisdiction"
        raw_tags = data.get("tags", ["Active"])
        if isinstance(raw_tags, str):
            tags = [t.strip() for t in raw_tags.split(",") if t.strip()]
        else:
            tags = list(raw_tags) if raw_tags else ["Active"]

        now = data.get("date") or time.strftime("%Y-%m-%d %H:%M:%S", time.gmtime())

        conn = get_db()
        # Verify unique case_id
        existing = conn.execute("SELECT id FROM cases WHERE id = ?", (case_id,)).fetchone()
        if existing:
            case_id = f"{case_id}-{secrets.randbelow(899)+100}"

        with conn:
            conn.execute(
                """
                INSERT INTO cases (
                    id, title, description, case_type, priority, status, owner,
                    assigned_investigators, location, entity_count, findings_count,
                    created_at, updated_at, tags
                ) VALUES (?, ?, ?, ?, ?, 'ACTIVE', ?, ?, ?, 0, 0, ?, ?, ?)
                """,
                (
                    case_id, title, desc, case_type, priority, owner,
                    json.dumps([owner]), location, now, now, json.dumps(tags)
                )
            )

        new_case_row = conn.execute("SELECT * FROM cases WHERE id = ?", (case_id,)).fetchone()
        created_case = dict(new_case_row)
        created_case["assigned_investigators"] = json.loads(created_case.get("assigned_investigators") or "[]")
        created_case["tags"] = json.loads(created_case.get("tags") or "[]")
        created_case["type"] = created_case.get("case_type")
        created_case["investigator"] = created_case.get("owner")
        conn.close()

        log_audit_event(
            current_user["user_id"], current_user["name"], current_user["role"], "CREATE_CASE",
            case_id=case_id, resource="CASE_MANAGEMENT",
            details={"title": title, "case_type": case_type, "priority": priority, "location": location},
            ip_address=client_ip
        )
        return 201, {
            "success": True,
            "case_id": case_id,
            "case": created_case,
            "message": f"Case {case_id} successfully authorized and created."
        }

    elif rel_path.startswith("/cases/") and method in ("PUT", "POST") and not any(rel_path.endswith(f"/{t}") for t in ("overview", "evidence", "entities", "network", "timeline", "findings", "reports", "related")):
        denied = require("edit_assigned_case")
        if denied:
            return denied
        case_id = rel_path.split("/")[2]
        data = body_data or {}

        conn = get_db()
        existing = conn.execute("SELECT * FROM cases WHERE id = ?", (case_id,)).fetchone()
        if not existing:
            conn.close()
            return 404, {"success": False, "message": "Case not found."}

        old_case = dict(existing)
        now = time.strftime("%Y-%m-%d %H:%M:%S", time.gmtime())

        # Collect fields to update
        updates = []
        params = []

        if "status" in data:
            new_status = data["status"].upper()
            updates.append("status = ?")
            params.append(new_status)
        if "priority" in data:
            updates.append("priority = ?")
            params.append(data["priority"].upper())
        if "title" in data:
            updates.append("title = ?")
            params.append(data["title"])
        if "description" in data:
            updates.append("description = ?")
            params.append(data["description"])
        if "case_type" in data or "type" in data:
            updates.append("case_type = ?")
            params.append(data.get("case_type") or data.get("type"))
        if "location" in data:
            updates.append("location = ?")
            params.append(data["location"])
        if "assigned_investigator" in data or "owner" in data:
            new_owner = data.get("assigned_investigator") or data.get("owner")
            updates.append("owner = ?")
            params.append(new_owner)
            updates.append("assigned_investigators = ?")
            params.append(json.dumps([new_owner]))
        if "tags" in data:
            raw_tags = data["tags"]
            tags_list = [t.strip() for t in raw_tags.split(",")] if isinstance(raw_tags, str) else list(raw_tags)
            updates.append("tags = ?")
            params.append(json.dumps(tags_list))

        updates.append("updated_at = ?")
        params.append(now)
        params.append(case_id)

        if updates:
            with conn:
                conn.execute(f"UPDATE cases SET {', '.join(updates)} WHERE id = ?", params)

        updated_row = conn.execute("SELECT * FROM cases WHERE id = ?", (case_id,)).fetchone()
        updated_case = dict(updated_row)
        updated_case["assigned_investigators"] = json.loads(updated_case.get("assigned_investigators") or "[]")
        updated_case["tags"] = json.loads(updated_case.get("tags") or "[]")
        updated_case["type"] = updated_case.get("case_type")
        updated_case["investigator"] = updated_case.get("owner")
        conn.close()

        # Audit logging
        if "status" in data and data["status"].upper() != old_case["status"]:
            log_audit_event(
                current_user["user_id"], current_user["name"], current_user["role"], "CHANGE_CASE_STATUS",
                case_id=case_id, resource="CASE_MANAGEMENT",
                details={"old_status": old_case["status"], "new_status": data["status"].upper()},
                ip_address=client_ip
            )
        else:
            log_audit_event(
                current_user["user_id"], current_user["name"], current_user["role"], "UPDATE_CASE",
                case_id=case_id, resource="CASE_MANAGEMENT",
                details={"updated_fields": list(data.keys())},
                ip_address=client_ip
            )

        return 200, {
            "success": True,
            "case_id": case_id,
            "case": updated_case,
            "message": f"Case {case_id} updated successfully."
        }

    elif rel_path.startswith("/cases/") and method == "DELETE":
        denied = require("edit_assigned_case")
        if denied:
            return denied
        case_id = rel_path.split("/")[2]
        conn = get_db()
        existing = conn.execute("SELECT * FROM cases WHERE id = ?", (case_id,)).fetchone()
        if not existing:
            conn.close()
            return 404, {"success": False, "message": "Case not found."}

        now = time.strftime("%Y-%m-%d %H:%M:%S", time.gmtime())
        with conn:
            conn.execute("UPDATE cases SET status = 'ARCHIVED', updated_at = ? WHERE id = ?", (now, case_id))
        conn.close()

        log_audit_event(
            current_user["user_id"], current_user["name"], current_user["role"], "ARCHIVE_CASE",
            case_id=case_id, resource="CASE_MANAGEMENT",
            details={"action": "archived"},
            ip_address=client_ip
        )
        return 200, {"success": True, "case_id": case_id, "message": f"Case {case_id} archived successfully."}

    elif rel_path.startswith("/cases/") and method == "GET":
        denied = require("view_cases")
        if denied:
            return denied
        parts = rel_path.split("/")
        case_id = parts[2]
        tab = parts[3] if len(parts) > 3 else "overview"

        conn = get_db()
        case_row = conn.execute("SELECT * FROM cases WHERE id = ?", (case_id,)).fetchone()
        if not case_row:
            conn.close()
            return 404, {"success": False, "message": "Case not found."}

        case_data = dict(case_row)
        case_data["assigned_investigators"] = json.loads(case_data.get("assigned_investigators") or "[]")
        case_data["tags"] = json.loads(case_data.get("tags") or "[]")
        case_data["type"] = case_data.get("case_type") or "Organized Crime"
        case_data["case_type"] = case_data.get("case_type") or "Organized Crime"
        case_data["investigator"] = case_data.get("owner") or "Investigator-7"
        case_data["location"] = case_data.get("location") or "National Jurisdiction"

        # Fetch entities for this case
        ce_rows = conn.execute("SELECT entity_id, role_in_case FROM case_entities WHERE case_id = ?", (case_id,)).fetchall()
        case_entity_ids = [r["entity_id"] for r in ce_rows]

        if case_entity_ids:
            ph = ",".join(["?"] * len(case_entity_ids))
            entity_rows = conn.execute(f"SELECT * FROM entities WHERE id IN ({ph})", case_entity_ids).fetchall()
        else:
            # Fallback for prototype: fetch primary entities if no explicit mapping yet
            entity_rows = conn.execute("SELECT * FROM entities LIMIT 28").fetchall()
            case_entity_ids = [r["id"] for r in entity_rows]

        entities = []
        entities_by_type = {
            "Person": [],
            "Phone": [],
            "Vehicle": [],
            "Organization": [],
            "Location": [],
            "FinancialAccount": [],
            "Incident": []
        }

        for r in entity_rows:
            d = dict(r)
            d["aliases"] = json.loads(d.get("aliases") or "[]")
            d["identifiers"] = json.loads(d.get("identifiers") or "{}")
            entities.append(d)
            etype = d.get("type", "Person")
            if etype in entities_by_type:
                entities_by_type[etype].append(d)
            else:
                entities_by_type.setdefault("Other", []).append(d)

        # Update case entity count
        case_data["entity_count"] = len(entities)
        case_data["entities"] = len(entities)

        # Fetch findings for this case
        findings_rows = conn.execute(
            "SELECT * FROM findings WHERE case_id = ? OR case_id IS NULL ORDER BY timestamp DESC",
            (case_id,)
        ).fetchall()
        findings = []
        for r in findings_rows:
            d = dict(r)
            d["affected_entities"] = json.loads(d.get("affected_entities") or "[]")
            d["reason_codes"] = json.loads(d.get("reason_codes") or "[]")
            d["supporting_evidence"] = json.loads(d.get("supporting_evidence") or "[]")
            d["risk_level"] = d.get("severity") or "HIGH"
            findings.append(d)

        case_data["findings_count"] = len(findings)
        case_data["findings"] = len(findings)

        # Fetch evidence documents
        docs_rows = conn.execute(
            "SELECT * FROM documents WHERE case_id = ? OR case_id IS NULL ORDER BY timestamp DESC",
            (case_id,)
        ).fetchall()
        docs = [dict(r) for r in docs_rows]

        # Fetch timeline
        timeline_rows = conn.execute(
            "SELECT * FROM timeline_events WHERE case_id = ? OR case_id IS NULL ORDER BY timestamp DESC LIMIT 15",
            (case_id,)
        ).fetchall()
        timeline = []
        for r in timeline_rows:
            d = dict(r)
            d["entity_ids"] = json.loads(d.get("entity_ids") or "[]")
            timeline.append(d)

        # Fetch related cases (cases connected through common entities)
        related_cases = []
        if case_entity_ids:
            ph = ",".join(["?"] * len(case_entity_ids))
            rel_query = f"""
                SELECT c.id as rel_case_id, c.title as rel_title, c.case_type as rel_type,
                       c.priority as rel_priority, c.status as rel_status,
                       ce.entity_id, e.canonical_name as entity_name, e.type as entity_type
                FROM case_entities ce
                JOIN cases c ON ce.case_id = c.id
                JOIN entities e ON ce.entity_id = e.id
                WHERE ce.case_id != ? AND ce.entity_id IN ({ph})
            """
            rel_rows = conn.execute(rel_query, [case_id] + case_entity_ids).fetchall()
            cases_map = {}
            for row in rel_rows:
                rcid = row["rel_case_id"]
                if rcid not in cases_map:
                    cases_map[rcid] = {
                        "id": rcid,
                        "title": row["rel_title"],
                        "type": row["rel_type"] or "Organized Crime",
                        "case_type": row["rel_type"] or "Organized Crime",
                        "priority": row["rel_priority"],
                        "status": row["rel_status"],
                        "shared_entities": []
                    }
                cases_map[rcid]["shared_entities"].append({
                    "id": row["entity_id"],
                    "name": row["entity_name"],
                    "type": row["entity_type"]
                })

            for rcid, rdata in cases_map.items():
                rdata["shared_count"] = len(rdata["shared_entities"])
                related_cases.append(rdata)

            # Sort by shared_count descending
            related_cases.sort(key=lambda x: x["shared_count"], reverse=True)

        conn.close()

        if tab == "overview" or len(parts) == 3:
            log_audit_event(
                current_user["user_id"], current_user["name"], current_user["role"], "VIEW_CASE",
                case_id=case_id, resource="CASE_WORKSPACE", ip_address=client_ip
            )
            return 200, {
                "case": case_data,
                "entities": entities,
                "entities_by_type": entities_by_type,
                "recent_entities": entities[:8],
                "recent_findings": findings[:6],
                "findings": findings,
                "recent_documents": docs[:6],
                "documents": docs,
                "recent_timeline": timeline[:6],
                "timeline": timeline,
                "related_cases": related_cases
            }

        elif tab == "evidence":
            return 200, {"case": case_data, "documents": docs}

        elif tab == "entities":
            return 200, {"case": case_data, "entities": entities, "entities_by_type": entities_by_type}

        elif tab == "network":
            graph_data = get_graph_data(case_id=case_id)
            return 200, graph_data

        elif tab == "timeline":
            return 200, {"case": case_data, "timeline": timeline}

        elif tab == "findings":
            return 200, {"case": case_data, "findings": findings}

        elif tab == "related":
            return 200, {"case": case_data, "related_cases": related_cases}

    # -------------------------------------------------------------
    # 4. ENTITIES ENDPOINTS
    # -------------------------------------------------------------
    elif rel_path == "/entities/search" and method == "GET":
        denied = require("search_entities")
        if denied:
            return denied
        query = qparam(query_params, "query") or ""
        type_filter = qparam(query_params, "type")
        risk_filter = qparam(query_params, "risk")

        conn = get_db()
        sql = "SELECT * FROM entities WHERE 1=1"
        params = []
        if query:
            sql += " AND (canonical_name LIKE ? OR aliases LIKE ? OR identifiers LIKE ?)"
            q = f"%{query}%"
            params.extend([q, q, q])
        if type_filter:
            sql += " AND type = ?"
            params.append(type_filter)
        if risk_filter:
            sql += " AND risk_level = ?"
            params.append(risk_filter)

        sql += " ORDER BY risk_score DESC LIMIT 100"
        rows = conn.execute(sql, params).fetchall()
        entities = []
        for r in rows:
            d = dict(r)
            d["aliases"] = json.loads(d["aliases"] or "[]")
            d["identifiers"] = json.loads(d["identifiers"] or "{}")
            entities.append(d)
        conn.close()

        if query:
            log_audit_event(
                current_user["user_id"], current_user["name"], current_user["role"], "SEARCH_ENTITIES",
                resource="ENTITY_SEARCH", details={"query": query, "results_count": len(entities)}, ip_address=client_ip
            )

        return 200, {"entities": entities, "count": len(entities)}

    elif rel_path.startswith("/entities/") and method == "GET" and not rel_path.startswith("/entities/resolution"):
        denied = require("view_entity_profile")
        if denied:
            return denied
        parts = rel_path.split("/")
        entity_id = parts[2]
        sub = parts[3] if len(parts) > 3 else "profile"

        conn = get_db()
        ent_row = conn.execute("SELECT * FROM entities WHERE id = ?", (entity_id,)).fetchone()
        if not ent_row:
            conn.close()
            return 404, {"success": False, "message": "Entity not found."}

        entity = dict(ent_row)
        entity["aliases"] = json.loads(entity["aliases"] or "[]")
        entity["identifiers"] = json.loads(entity["identifiers"] or "{}")

        if sub == "profile" or len(parts) == 3:
            # Connections
            rel_rows = conn.execute(
                """
                SELECT r.*, e.canonical_name as target_name, e.type as target_type, e.risk_level as target_risk
                FROM relationships r
                JOIN entities e ON (r.target_id = e.id OR r.source_id = e.id)
                WHERE (r.source_id = ? OR r.target_id = ?) AND e.id != ?
                """,
                (entity_id, entity_id, entity_id)
            ).fetchall()
            connections = [dict(r) for r in rel_rows]

            # Timeline
            tl_rows = conn.execute("SELECT * FROM timeline_events WHERE entity_ids LIKE ? ORDER BY timestamp DESC", (f"%{entity_id}%",)).fetchall()
            timeline = [dict(r) for r in tl_rows]

            # AI Insights
            findings_rows = conn.execute("SELECT * FROM findings WHERE affected_entities LIKE ?", (f"%{entity['canonical_name']}%",)).fetchall()
            insights = []
            for r in findings_rows:
                d = dict(r)
                d["affected_entities"] = json.loads(d["affected_entities"] or "[]")
                d["reason_codes"] = json.loads(d["reason_codes"] or "[]")
                d["supporting_evidence"] = json.loads(d["supporting_evidence"] or "[]")
                insights.append(d)

            # Financial records if applicable
            phone = entity["identifiers"].get("phone", "")
            account = entity["identifiers"].get("account_number", "")
            tx_rows = conn.execute(
                "SELECT * FROM financial_transactions WHERE source_account = ? OR target_account = ? OR sender_name LIKE ? OR receiver_name LIKE ?",
                (account, account, f"%{entity['canonical_name']}%", f"%{entity['canonical_name']}%")
            ).fetchall()
            financials = [dict(r) for r in tx_rows]

            # Documents
            docs_rows = conn.execute("SELECT * FROM documents WHERE raw_text LIKE ?", (f"%{entity['canonical_name']}%",)).fetchall()
            documents = [dict(r) for r in docs_rows]

            conn.close()

            log_audit_event(
                current_user["user_id"], current_user["name"], current_user["role"], "VIEW_ENTITY_PROFILE",
                entity_id=entity_id, resource="ENTITY_PROFILE", details={"entity_name": entity["canonical_name"]}, ip_address=client_ip
            )

            return 200, {
                "entity": entity,
                "connections": connections,
                "timeline": timeline,
                "ai_insights": insights,
                "financial_records": financials,
                "source_documents": documents
            }

    # -------------------------------------------------------------
    # 5. ENTITY RESOLUTION ENDPOINTS
    # -------------------------------------------------------------
    elif rel_path == "/entities/resolution/candidates" and method == "GET":
        denied = require("resolve_entities")
        if denied:
            return denied
        candidates = get_pending_resolution_candidates()
        return 200, {"candidates": candidates, "count": len(candidates)}

    elif rel_path == "/entities/resolution/resolve" and method == "POST":
        denied = require("resolve_entities")
        if denied:
            return denied
        candidate_id = (body_data or {}).get("candidate_id", "")
        decision = (body_data or {}).get("decision", "MERGE")
        res = resolve_candidate(candidate_id, decision, operator_name=current_user["name"])
        
        log_audit_event(
            current_user["user_id"], current_user["name"], current_user["role"], "RESOLVE_ENTITY_IDENTITY",
            resource="ENTITY_RESOLUTION", details={"candidate_id": candidate_id, "decision": decision}, ip_address=client_ip
        )
        return 200, res

    elif rel_path == "/entities/resolution/scan" and method == "POST":
        denied = require("resolve_entities")
        if denied:
            return denied
        new_candidates = run_entity_resolution_scan()
        return 200, {"success": True, "proposals_found": len(new_candidates)}

    # -------------------------------------------------------------
    # 6. GRAPH CANVAS & ANALYTICS ENDPOINTS
    # -------------------------------------------------------------
    elif rel_path == "/graph/data" and method == "GET":
        denied = require("explore_graph")
        if denied:
            return denied
        case_id = qparam(query_params, "case_id")
        types = qparam(query_params, "types")
        types_list = types.split(",") if types else None
        min_conf = float(qparam(query_params, "min_confidence") or 0.0)
        search = qparam(query_params, "search")

        graph_data = get_graph_data(case_id=case_id, entity_types=types_list, min_confidence=min_conf, search_query=search)
        return 200, graph_data

    elif rel_path == "/graph/expand" and method == "POST":
        denied = require("explore_graph")
        if denied:
            return denied
        data = body_data or {}
        entity_id = data.get("entity_id") or data.get("entityId") or ""
        if not entity_id:
            return 400, {"success": False, "message": "entity_id is required."}
        hops = int(data.get("hops", 1))
        res = expand_entity_neighborhood(entity_id, hops=hops)

        log_audit_event(
            current_user["user_id"], current_user["name"], current_user["role"], "EXPAND_GRAPH",
            entity_id=entity_id, resource="GRAPH_EXPLORER", details={"hops": hops, "total_nodes": res["total_nodes"]}, ip_address=client_ip
        )
        return 200, res

    elif rel_path == "/graph/shortest-path" and method == "POST":
        denied = require("explore_graph")
        if denied:
            return denied
        data = body_data or {}
        source_id = data.get("source_id") or data.get("sourceId") or ""
        target_id = data.get("target_id") or data.get("targetId") or ""
        if not source_id or not target_id:
            return 400, {"success": False, "message": "source_id and target_id are required."}
        res = find_shortest_path(source_id, target_id)

        log_audit_event(
            current_user["user_id"], current_user["name"], current_user["role"], "SHORTEST_PATH_ANALYSIS",
            resource="GRAPH_EXPLORER", details={"source_id": source_id, "target_id": target_id, "found": res.get("found")}, ip_address=client_ip
        )
        return 200, res

    elif rel_path == "/graph/analytics" and method == "GET":
        denied = require("explore_graph")
        if denied:
            return denied
        metrics = compute_graph_metrics()
        return 200, metrics

    elif rel_path == "/graph/export/cytoscape" and method == "GET":
        denied = require("explore_graph")
        if denied:
            return denied
        data = export_cytoscape_json()
        return 200, data

    elif rel_path == "/graph/export/graphml" and method == "GET":
        denied = require("explore_graph")
        if denied:
            return denied
        xml_data = export_graphml_xml()
        return 200, {"graphml": xml_data}

    # -------------------------------------------------------------
    # 7. AI FINDINGS & PATTERNS ENDPOINTS
    # -------------------------------------------------------------
    elif rel_path == "/findings" and method == "GET":
        denied = require("view_findings")
        if denied:
            return denied
        status_filter = qparam(query_params, "status")
        case_filter = qparam(query_params, "case_id")
        conn = get_db()
        query = "SELECT * FROM findings WHERE 1=1"
        params = []
        if status_filter:
            query += " AND status = ?"
            params.append(status_filter)
        if case_filter:
            query += " AND case_id = ?"
            params.append(case_filter)
        query += " ORDER BY confidence DESC"
        rows = conn.execute(query, params).fetchall()
        findings = []
        for r in rows:
            d = dict(r)
            d["affected_entities"] = json.loads(d["affected_entities"] or "[]")
            d["reason_codes"] = json.loads(d["reason_codes"] or "[]")
            d["supporting_evidence"] = json.loads(d["supporting_evidence"] or "[]")
            findings.append(d)
        conn.close()
        return 200, {"findings": findings}

    elif rel_path.startswith("/findings/") and rel_path.endswith("/update-status") and method == "POST":
        denied = require("verify_finding")
        if denied:
            return denied
        parts = rel_path.split("/")
        finding_id = parts[2]
        new_status = (body_data or {}).get("status", "VERIFIED")

        conn = get_db()
        with conn:
            conn.execute("UPDATE findings SET status = ? WHERE id = ?", (new_status, finding_id))
        conn.close()

        log_audit_event(
            current_user["user_id"], current_user["name"], current_user["role"], "UPDATE_FINDING_STATUS",
            resource="AI_FINDINGS", details={"finding_id": finding_id, "status": new_status}, ip_address=client_ip
        )
        return 200, {"success": True, "finding_id": finding_id, "status": new_status}

    elif rel_path == "/analysis/run-pipeline" and method == "POST":
        denied = require("run_analysis")
        if denied:
            return denied
        findings = run_all_pattern_detectors()
        compute_graph_metrics()
        
        log_audit_event(
            current_user["user_id"], current_user["name"], current_user["role"], "RUN_AI_PATTERN_PIPELINE",
            resource="AI_ENGINE", details={"findings_generated": len(findings)}, ip_address=client_ip
        )
        return 200, {"success": True, "findings": findings, "count": len(findings)}

    # -------------------------------------------------------------
    # 8. INGESTION ENDPOINTS
    # -------------------------------------------------------------
    elif rel_path == "/ingestion/documents" and method == "GET":
        denied = require("view_evidence")
        if denied:
            return denied
        case_id = qparam(query_params, "case_id")
        if case_id:
            cid, case_err = resolve_case_id(case_id, required=True)
            if case_err:
                return case_err
            docs = get_all_documents(case_id=cid)
        else:
            docs = get_all_documents()
        return 200, {"documents": docs}

    elif rel_path.startswith("/ingestion/documents/") and method == "GET":
        denied = require("view_evidence")
        if denied:
            return denied
        doc_id = rel_path.split("/")[3]
        payload = get_document_with_spans(doc_id)
        if not payload:
            return 404, {"success": False, "message": "Document not found."}
        return 200, payload

    elif rel_path == "/ingestion/upload" and method == "POST":
        denied = require("ingest_data")
        if denied:
            return denied
        data = body_data or {}
        filename = data.get("filename", "Uploaded_Investigation_File.txt")
        content_text = data.get("content", "")
        category = data.get("category", "FIR")
        raw_case_id = data.get("case_id")

        # Case-scope: validate provided case_id; demo default only if omitted
        cid, case_err = resolve_case_id(raw_case_id, required=False, allow_demo_default=True)
        if case_err:
            return case_err

        file_bytes = content_text.encode("utf-8")
        result = process_uploaded_document(
            filename=filename,
            file_bytes=file_bytes,
            source_category=category,
            case_id=cid,
            uploader=current_user["name"]
        )

        log_audit_event(
            current_user["user_id"], current_user["name"], current_user["role"], "INGEST_DOCUMENT",
            case_id=cid, resource="INGESTION_CENTER",
            details={"filename": filename, "sha256": result["sha256_hash"], "span_count": result.get("span_count", 0)},
            ip_address=client_ip
        )
        return 200, result

    # -------------------------------------------------------------
    # 9. REPORTS ENDPOINTS
    # -------------------------------------------------------------
    elif rel_path == "/reports" and method == "GET":
        denied = require("generate_report")
        if denied:
            # Analysts/investigators have generate_report; auditors may not — allow view via generate_report only
            denied_view = require("view_cases")
            if denied_view:
                return denied
        reports = get_all_reports()
        return 200, {"reports": reports}

    elif rel_path.startswith("/reports/") and method == "GET":
        denied = require("generate_report")
        if denied:
            denied_view = require("view_cases")
            if denied_view:
                return denied
        parts = rel_path.split("/")
        report_id = parts[2]
        rep = get_report_by_id(report_id)
        if not rep:
            return 404, {"success": False, "message": "Report not found."}
        return 200, rep

    elif rel_path == "/reports/generate" and method == "POST":
        denied = require("generate_report")
        if denied:
            return denied
        data = body_data or {}
        raw_case_id = data.get("case_id")
        cid, case_err = resolve_case_id(raw_case_id, required=True, allow_demo_default=False)
        if case_err:
            # Soft fallback for demo builders that omit case_id
            if not raw_case_id:
                cid, case_err = resolve_case_id(None, required=False, allow_demo_default=True)
            if case_err:
                return case_err
        title = data.get("title", "Comprehensive Criminal Network Intelligence Report")
        selected_entities = data.get("entity_ids", None)
        selected_findings = data.get("finding_ids", None)
        summary = data.get("executive_summary", None)

        report = generate_intelligence_report(
            case_id=cid,
            title=title,
            created_by=current_user["name"],
            selected_entity_ids=selected_entities,
            selected_finding_ids=selected_findings,
            executive_summary=summary
        )

        log_audit_event(
            current_user["user_id"], current_user["name"], current_user["role"], "GENERATE_REPORT",
            case_id=cid, resource="REPORT_BUILDER",
            details={"report_id": report["report_id"], "report_number": report["report_number"]},
            ip_address=client_ip
        )
        return 201, report

    # -------------------------------------------------------------
    # 10. AUDIT LOG ENDPOINTS
    # -------------------------------------------------------------
    elif rel_path == "/audit-events" and method == "GET":
        denied = require("view_all_audit")
        if denied:
            return denied
        limit = int(qparam(query_params, "limit") or 100)
        action = qparam(query_params, "action")
        user_f = qparam(query_params, "user")
        case_f = qparam(query_params, "case")
        # Investigators with only view_own_audit see their own trail
        if not has_permission(current_user["role"], "view_all_audit") and not has_permission(current_user["role"], "export_audit"):
            user_f = current_user.get("name") or user_f

        events = get_audit_events(limit=limit, action_filter=action, user_filter=user_f, case_filter=case_f)
        return 200, {"audit_events": events, "count": len(events)}

    # -------------------------------------------------------------
    # 11. SETTINGS ENDPOINTS
    # -------------------------------------------------------------
    elif rel_path == "/settings/users" and method == "GET":
        denied = require("view_dashboard")
        if denied:
            return denied
        conn = get_db()
        rows = conn.execute("SELECT id, email, name, role, badge_number, unit, active, created_at FROM users").fetchall()
        conn.close()
        return 200, {"users": [dict(r) for r in rows]}

    elif rel_path == "/settings/roles" and method == "GET":
        denied = require("view_dashboard")
        if denied:
            return denied
        return 200, {"roles": ROLES, "permissions": ROLE_PERMISSIONS}

    return 404, {"error": "API endpoint not found", "path": rel_path}
