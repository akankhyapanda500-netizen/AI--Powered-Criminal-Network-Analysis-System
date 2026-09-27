import re

with open('scratch/emergent_bundle.js', 'r', encoding='utf-8') as f:
    bundle = f.read()

components = [
    'Dashboard', 'Investigate', 'UploadModule', 'Records', 'Persons',
    'CaseModule', 'NetworkModule', 'FaceModule', 'MapModule', 'ProgressModule',
    'Alerts', 'Reports', 'Audit', 'Administration', 'Assistant', 'SearchResults'
]

for comp in components:
    # Look for function Comp( or function Comp (
    pattern = rf'function\s+{comp}\s*\(([^\)]*)\)\s*\{{'
    m = re.search(pattern, bundle)
    if m:
        start = m.start()
        # Find next function or 3000 chars
        snippet = bundle[start:start+8000]
        with open(f'scratch/{comp}_dump.js', 'w', encoding='utf-8') as out:
            out.write(snippet)
        print(f"Extracted {comp} snippet ({len(snippet)} chars)")
    else:
        print(f"Component {comp} not found directly with regex")
