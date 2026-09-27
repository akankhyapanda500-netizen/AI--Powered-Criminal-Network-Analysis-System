"""
SIPER Document Ingestion & Provenance Engine
Ingests police reports, FIRs, CDR logs, bank statements, extracts structured entities,
persists NER character spans, and links provenance to the case graph.
"""
import hashlib
import time
import json
import secrets
from pathlib import Path
from typing import Dict, Any, List, Optional
from .database import get_db
from .nlp_engine import extract_structured_entities
from .graph import compute_graph_metrics

ENTITY_BUCKET_TO_TYPE = {
    "persons": "Person",
    "phones": "Phone",
    "vehicles": "Vehicle",
    "locations": "Location",
    "organizations": "Organization",
    "financial_accounts": "FinancialAccount",
}


def compute_sha256(content: bytes) -> str:
    """Compute cryptographic SHA-256 hash for document integrity and chain of custody."""
    return hashlib.sha256(content).hexdigest()


def _find_entity_id(conn, canonical_name: str, entity_type: str) -> Optional[str]:
    row = conn.execute(
        "SELECT id FROM entities WHERE canonical_name = ? AND type = ? LIMIT 1",
        (canonical_name, entity_type),
    ).fetchone()
    return row["id"] if row else None


def _persist_spans(conn, document_id: str, extracted: Dict[str, List[Dict[str, Any]]]) -> int:
    """Persist NLP character spans for evidence highlighting."""
    count = 0
    for bucket, entity_type in ENTITY_BUCKET_TO_TYPE.items():
        for item in extracted.get(bucket, []):
            span = item.get("span") or [0, 0]
            mention = item.get("value", "")
            if not mention:
                continue
            # Prefer matching existing entity by normalized display name
            display = mention
            if entity_type == "Phone" and not mention.startswith("+"):
                display = f"+91-{mention}" if len(mention) == 10 else mention
            ent_id = _find_entity_id(conn, display, entity_type) or _find_entity_id(conn, mention, entity_type)
            span_id = f"span_{secrets.token_hex(6)}"
            conf = float(item.get("confidence", 0.85))
            conn.execute(
                """
                INSERT INTO document_entity_spans (
                    id, document_id, entity_id, entity_type, mention_text,
                    start_offset, end_offset, confidence
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                """,
                (
                    span_id,
                    document_id,
                    ent_id,
                    entity_type,
                    mention,
                    int(span[0]),
                    int(span[1]),
                    conf,
                ),
            )
            count += 1
    return count


def _link_entity_to_case(conn, case_id: str, entity_id: str, timestamp: str):
    if not case_id or not entity_id:
        return
    conn.execute(
        """
        INSERT OR IGNORE INTO case_entities (case_id, entity_id, role_in_case, created_at)
        VALUES (?, ?, 'EXTRACTED_FROM_DOCUMENT', ?)
        """,
        (case_id, entity_id, timestamp),
    )


def process_uploaded_document(
    filename: str,
    file_bytes: bytes,
    source_category: str = "FIR",
    case_id: Optional[str] = None,
    uploader: str = "Investigator-7",
) -> Dict[str, Any]:
    """Process uploaded file, extract entities + spans, persist, and attach to case graph."""
    if not case_id:
        case_id = "CASE-26189"

    doc_id = f"doc_{secrets.token_hex(6)}"
    sha256 = compute_sha256(file_bytes)
    file_size = len(file_bytes)
    timestamp = time.strftime("%Y-%m-%d %H:%M:%S", time.gmtime())

    try:
        raw_text = file_bytes.decode("utf-8", errors="replace")
    except Exception:
        raw_text = f"[Binary Document content for {filename}]"

    extracted = extract_structured_entities(raw_text)
    total_extracted = sum(
        len(extracted[k])
        for k in ("persons", "phones", "vehicles", "locations", "organizations", "financial_accounts")
    )

    conn = get_db()
    try:
        with conn:
            conn.execute(
                """
                INSERT INTO documents (
                    id, title, file_type, file_size, case_id, uploader,
                    timestamp, sha256_hash, extracted_entities_count, raw_text, source_category
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """,
                (
                    doc_id,
                    filename,
                    Path(filename).suffix.upper().replace(".", "") or "TXT",
                    file_size,
                    case_id,
                    uploader,
                    timestamp,
                    sha256,
                    total_extracted,
                    raw_text,
                    source_category,
                ),
            )

            created_entity_ids: List[str] = []

            for p in extracted["persons"]:
                ent_id = f"ent_p_{secrets.token_hex(4)}"
                existing = _find_entity_id(conn, p["value"], "Person")
                if existing:
                    created_entity_ids.append(existing)
                    _link_entity_to_case(conn, case_id, existing, timestamp)
                else:
                    conn.execute(
                        """
                        INSERT INTO entities (
                            id, canonical_name, type, risk_level, risk_score, confidence,
                            aliases, identifiers, notes, created_at, updated_at
                        ) VALUES (?, ?, 'Person', 'MEDIUM', 65, 0.85, '[]', '{}', ?, ?, ?)
                        """,
                        (ent_id, p["value"], f"Extracted from {filename}", timestamp, timestamp),
                    )
                    created_entity_ids.append(ent_id)
                    _link_entity_to_case(conn, case_id, ent_id, timestamp)

            for ph in extracted["phones"]:
                display = f"+91-{ph['value']}" if len(ph["value"]) == 10 else ph["value"]
                existing = _find_entity_id(conn, display, "Phone")
                if existing:
                    created_entity_ids.append(existing)
                    _link_entity_to_case(conn, case_id, existing, timestamp)
                else:
                    ent_id = f"ent_ph_{secrets.token_hex(4)}"
                    id_json = json.dumps({"phone": ph["value"]})
                    conn.execute(
                        """
                        INSERT INTO entities (
                            id, canonical_name, type, risk_level, risk_score, confidence,
                            aliases, identifiers, notes, created_at, updated_at
                        ) VALUES (?, ?, 'Phone', 'LOW', 35, 0.95, '[]', ?, ?, ?, ?)
                        """,
                        (ent_id, display, id_json, f"Discovered in {filename}", timestamp, timestamp),
                    )
                    created_entity_ids.append(ent_id)
                    _link_entity_to_case(conn, case_id, ent_id, timestamp)

            for v in extracted["vehicles"]:
                existing = _find_entity_id(conn, v["value"], "Vehicle")
                if existing:
                    created_entity_ids.append(existing)
                    _link_entity_to_case(conn, case_id, existing, timestamp)
                else:
                    ent_id = f"ent_v_{secrets.token_hex(4)}"
                    id_json = json.dumps({"vehicle_plate": v["value"]})
                    conn.execute(
                        """
                        INSERT INTO entities (
                            id, canonical_name, type, risk_level, risk_score, confidence,
                            aliases, identifiers, notes, created_at, updated_at
                        ) VALUES (?, ?, 'Vehicle', 'MEDIUM', 55, 0.92, '[]', ?, ?, ?, ?)
                        """,
                        (ent_id, v["value"], id_json, f"Vehicle referenced in {filename}", timestamp, timestamp),
                    )
                    created_entity_ids.append(ent_id)
                    _link_entity_to_case(conn, case_id, ent_id, timestamp)

            for loc in extracted["locations"]:
                existing = _find_entity_id(conn, loc["value"], "Location")
                if existing:
                    created_entity_ids.append(existing)
                    _link_entity_to_case(conn, case_id, existing, timestamp)
                else:
                    ent_id = f"ent_loc_{secrets.token_hex(4)}"
                    conn.execute(
                        """
                        INSERT INTO entities (
                            id, canonical_name, type, risk_level, risk_score, confidence,
                            aliases, identifiers, notes, created_at, updated_at
                        ) VALUES (?, ?, 'Location', 'LOW', 20, 0.90, '[]', '{}', ?, ?, ?)
                        """,
                        (ent_id, loc["value"], f"Location identified in {filename}", timestamp, timestamp),
                    )
                    created_entity_ids.append(ent_id)
                    _link_entity_to_case(conn, case_id, ent_id, timestamp)

            for org in extracted["organizations"]:
                existing = _find_entity_id(conn, org["value"], "Organization")
                if existing:
                    created_entity_ids.append(existing)
                    _link_entity_to_case(conn, case_id, existing, timestamp)
                else:
                    ent_id = f"ent_org_{secrets.token_hex(4)}"
                    conn.execute(
                        """
                        INSERT INTO entities (
                            id, canonical_name, type, risk_level, risk_score, confidence,
                            aliases, identifiers, notes, created_at, updated_at
                        ) VALUES (?, ?, 'Organization', 'HIGH', 78, 0.88, '[]', '{}', ?, ?, ?)
                        """,
                        (ent_id, org["value"], f"Organization identified in {filename}", timestamp, timestamp),
                    )
                    created_entity_ids.append(ent_id)
                    _link_entity_to_case(conn, case_id, ent_id, timestamp)

            span_count = _persist_spans(conn, doc_id, extracted)

            # Refresh denormalized case counts
            ecount = conn.execute(
                "SELECT COUNT(DISTINCT entity_id) AS c FROM case_entities WHERE case_id = ?",
                (case_id,),
            ).fetchone()["c"]
            conn.execute(
                "UPDATE cases SET entity_count = ?, updated_at = ? WHERE id = ?",
                (ecount, timestamp, case_id),
            )

        compute_graph_metrics()

        return {
            "document_id": doc_id,
            "filename": filename,
            "sha256_hash": sha256,
            "file_size": file_size,
            "case_id": case_id,
            "source_category": source_category,
            "extracted_count": total_extracted,
            "span_count": span_count,
            "extracted_entities": extracted,
            "linked_entity_ids": created_entity_ids,
            "status": "PROCESSED_SUCCESSFULLY",
        }
    finally:
        conn.close()


def get_all_documents(case_id: Optional[str] = None) -> List[Dict[str, Any]]:
    """Fetch ingested investigative documents with metadata."""
    conn = get_db()
    try:
        query = "SELECT * FROM documents"
        params: List[Any] = []
        if case_id:
            query += " WHERE case_id = ?"
            params.append(case_id)
        query += " ORDER BY timestamp DESC"
        rows = conn.execute(query, params).fetchall()
        return [dict(r) for r in rows]
    finally:
        conn.close()


def get_document_with_spans(document_id: str) -> Optional[Dict[str, Any]]:
    """Fetch a single document plus NER highlight spans for the evidence workspace."""
    conn = get_db()
    try:
        row = conn.execute("SELECT * FROM documents WHERE id = ?", (document_id,)).fetchone()
        if not row:
            return None
        doc = dict(row)
        span_rows = conn.execute(
            """
            SELECT id, document_id, entity_id, entity_type, mention_text,
                   start_offset, end_offset, confidence
            FROM document_entity_spans
            WHERE document_id = ?
            ORDER BY start_offset ASC
            """,
            (document_id,),
        ).fetchall()
        return {"document": doc, "spans": [dict(s) for s in span_rows]}
    finally:
        conn.close()


def backfill_spans_for_existing_documents() -> int:
    """Re-run NLP on seed documents that have raw_text but no spans yet."""
    conn = get_db()
    total = 0
    try:
        docs = conn.execute(
            """
            SELECT d.id, d.raw_text FROM documents d
            WHERE d.raw_text IS NOT NULL AND d.raw_text != ''
              AND NOT EXISTS (
                  SELECT 1 FROM document_entity_spans s WHERE s.document_id = d.id
              )
            """
        ).fetchall()
        with conn:
            for doc in docs:
                extracted = extract_structured_entities(doc["raw_text"] or "")
                total += _persist_spans(conn, doc["id"], extracted)
        return total
    finally:
        conn.close()
