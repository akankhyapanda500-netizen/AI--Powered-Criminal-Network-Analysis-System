import re
import json

with open('scratch/emergent_bundle.js', 'r', encoding='utf-8') as f:
    bundle = f.read()

# Let's search for React JSX or render logic, navigation items, state constants
# Find all tabs or navigation menus
tab_matches = re.findall(r'(\w+):\s*\{[^\}]*title:[^\}]*\}', bundle)

# Search for the main application component or view router
# Let's search for strings matching common navigation names or titles
sections = re.findall(r'\{[^{}]*id:\s*["\']([a-zA-Z0-9_\-]+)["\'][^{}]*label:\s*["\']([^"\']+)["\'][^{}]*\}', bundle)
print("Nav/Sections found:", sections)

# Search for mock datasets in the bundle (FIRs, cases, entities, graph nodes/edges, locations)
# Find large object or array literals
mock_data_matches = re.findall(r'(const|var|let)\s+([a-zA-Z0-9_]+)\s*=\s*(\[\s*\{.*?\}\s*\]);', bundle, re.DOTALL)
print(f"Mock data arrays found: {len(mock_data_matches)}")
for var_type, var_name, var_val in mock_data_matches[:10]:
    print(f"  - {var_name} (length {len(var_val)})")

# Search for component definitions or main screens
screens = re.findall(r'function\s+([A-Za-z0-9_]+View|[A-Za-z0-9_]+Screen|[A-Za-z0-9_]+Modal|[A-Za-z0-9_]+Tab|[A-Za-z0-9_]+Panel|[A-Za-z0-9_]+Section|[A-Za-z0-9_]+Dashboard|[A-Za-z0-9_]+Map|[A-Za-z0-9_]+Graph|[A-Za-z0-9_]+Upload)\b', bundle)
print("Screen components:", set(screens))

# Let's extract code chunks around main features
with open('scratch/extracted_app_code.js', 'w', encoding='utf-8') as out:
    # search for keywords and save snippets
    for kw in ['National command dashboard', 'MAP INTELLIGENCE', 'RELATIONSHIP GRAPH', 'FIR UPLOAD', 'What similarities exist', 'India case concentration']:
        pos = bundle.find(kw)
        if pos != -1:
            snippet = bundle[max(0, pos-500):min(len(bundle), pos+1500)]
            out.write(f"\n\n=== SNIPPET FOR {kw} ===\n{snippet}\n")

print("Saved snippets to scratch/extracted_app_code.js")
