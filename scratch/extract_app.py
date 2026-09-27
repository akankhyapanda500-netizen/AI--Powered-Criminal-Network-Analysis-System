import re

with open('scratch/emergent_bundle.js', 'r', encoding='utf-8') as f:
    bundle = f.read()

# Let's find all module files that were bundled into this webpack bundle
modules = re.findall(r'/\*\*\*! \./(src/[^*]+) \*\*\*/', bundle)
print("Modules found in bundle:", set(modules))

# Let's extract the main App.js code block
app_start = bundle.find('/*! ./src/App.js */')
if app_start != -1:
    app_end = bundle.find('/*! ./src/', app_start + 20)
    if app_end == -1:
        app_end = app_start + 40000
    app_code = bundle[app_start:app_end]
    with open('scratch/App_extracted.js', 'w', encoding='utf-8') as out:
        out.write(app_code)
    print(f"Extracted App.js ({len(app_code)} chars)")
else:
    # Alternative search
    print("Searching App module...")
    pos = bundle.find('function App()')
    if pos != -1:
        app_code = bundle[pos:pos+45000]
        with open('scratch/App_extracted.js', 'w', encoding='utf-8') as out:
            out.write(app_code)
        print(f"Extracted App function snippet ({len(app_code)} chars)")
