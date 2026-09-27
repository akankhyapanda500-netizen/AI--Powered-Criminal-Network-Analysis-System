import glob
import re

dumps = glob.glob('scratch/*_dump.js')
for d in sorted(dumps):
    with open(d, 'r', encoding='utf-8') as f:
        code = f.read()
    print("=" * 60)
    print(f"FILE: {d}")
    print("=" * 60)
    # Print first 2000 chars of code or clean up JSX strings
    # Extract text contents inside jsxDEV
    texts = re.findall(r'children:\s*["\']([^"\']+)["\']', code)
    print("UI Texts:", texts[:15])
