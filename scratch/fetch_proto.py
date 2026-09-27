import urllib.request
import re
import json

base_url = 'https://ocr-link-detect.preview.emergentagent.com'
bundle_url = f'{base_url}/static/js/bundle.js'
req = urllib.request.Request(bundle_url, headers={'User-Agent': 'Mozilla/5.0'})

try:
    with urllib.request.urlopen(req) as resp:
        content = resp.read().decode('utf-8', errors='ignore')
        print(f'Downloaded bundle: {len(content)} chars')
        with open('scratch/emergent_bundle.js', 'w', encoding='utf-8') as f:
            f.write(content)
            
        # Extract UI strings, components, titles, mock data
        print("Searching bundle patterns...")
except Exception as e:
    print('Error downloading bundle:', e)
