import re
import json

with open('scratch/emergent_bundle.js', 'r', encoding='utf-8') as f:
    code = f.read()

# Let's search for React component functions, JSX strings, headers, navigation items, state variables
print(f"Total bundle size: {len(code)} characters")

# Find navigation / tabs / views
nav_matches = re.findall(r'["\']([A-Z][a-zA-Z0-9\s]{2,30})["\']', code)
# Find all string literals longer than 15 chars that look like UI labels or descriptions
long_strings = set(re.findall(r'["\']([A-Z][^"\'\n]{10,120})["\']', code))

# Filter for relevant UI terms
keywords = ['OCR', 'Link', 'Document', 'Upload', 'Entity', 'Graph', 'Confidence', 'Analysis', 'Suspect', 'Phone', 'Transaction', 'FIR', 'Case', 'Audit', 'Dashboard', 'Detection', 'Cross-case', 'Export', 'Filter', 'Bounding', 'Textract', 'Tesseract']

relevant_strings = []
for s in sorted(long_strings):
    if any(k.lower() in s.lower() for k in keywords):
        relevant_strings.append(s)

with open('scratch/extracted_ui_strings.txt', 'w', encoding='utf-8') as out:
    for s in relevant_strings:
        out.write(s + '\n')

print(f"Extracted {len(relevant_strings)} relevant UI strings to scratch/extracted_ui_strings.txt")

# Let's also check for backend endpoints or mock data structures
endpoints = set(re.findall(r'["\'](/(?:api/|v1/)[a-zA-Z0-9_\-\/]+)["\']', code))
print("API endpoints found in bundle:", endpoints)

# Find React components defined in the bundle
# Look for function names or variable declarations
components = set(re.findall(r'function\s+([A-Z][a-zA-Z0-9]+)\s*\(', code))
print(f"Components found: {len(components)}")
with open('scratch/components_list.txt', 'w', encoding='utf-8') as out:
    for c in sorted(components):
        out.write(c + '\n')
