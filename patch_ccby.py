import sys, io, re, os
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

# 1. Update GLB_MODELS in arRoutes.ts 
ar_routes_path = r'src\routes\arRoutes.ts'
with open(ar_routes_path, 'r', encoding='utf-8') as f:
    src_ar = f.read()

replacements_glb = {
    r"cow: \{ sub: 'cc0', file: 'Cow\.glb' \},": r"cow: { sub: 'cc-by', file: 'Cow.glb' },",
    r"horse: \{ sub: 'cc0', file: 'Horse\.glb' \},": r"horse: { sub: 'cc-by', file: 'Horse.glb' },",
    r"pig: \{ sub: 'cc0', file: 'Pig\.glb' \},": r"pig: { sub: 'cc-by', file: 'Pig.glb' },",
    r"sheep: \{ sub: 'cc0', file: 'Sheep\.glb' \},": r"sheep: { sub: 'cc-by', file: 'Sheep.glb' },",
    r"donkey: \{ sub: 'cc0', file: 'Donkey\.glb' \},": r"donkey: { sub: 'cc-by', file: 'Donkey.glb' },",
    r"fox: \{ sub: 'cc0', file: 'Fox\.glb' \},": r"fox: { sub: 'cc-by', file: 'Fox.glb' },",
    r"wolf: \{ sub: 'cc0', file: 'Wolf\.glb' \},": r"wolf: { sub: 'cc-by', file: 'Howling Wolf.glb' },",
    r"deer: \{ sub: 'cc0', file: 'Deer\.glb' \},": r"deer: { sub: 'cc-by', file: 'Deer.glb' },",
    r"zebra: \{ sub: 'cc0', file: 'Zebra\.glb' \},": r"zebra: { sub: 'cc-by', file: 'Zebra.glb' },",
    r"llama: \{ sub: 'cc0', file: 'Llama\.glb' \},": r"llama: { sub: 'cc-by', file: 'Llama.glb' },",
    r"rat: \{ sub: 'cc0', file: 'Rat\.glb' \},": r"rat: { sub: 'cc-by', file: 'Rat.glb' },\n    hamster: { sub: 'cc-by', file: 'Hamster.glb' },",
    r"bat: \{ sub: 'cc0', file: 'Bat\.glb' \},": r"bat: { sub: 'cc-by', file: 'Bat.glb' },",
    r"bird: \{ sub: 'cc0', file: 'Bird\.glb' \},": r"bird: { sub: 'cc-by', file: 'Western bluebird.glb' },\n    bluebird: { sub: 'cc-by', file: 'Western bluebird.glb' },",
    r"snake: \{ sub: 'cc0', file: 'Snake\.glb' \},": r"snake: { sub: 'cc-by', file: 'Snake.glb' },",
    r"frog: \{ sub: 'cc0', file: 'Frog\.glb' \},": r"frog: { sub: 'cc-by', file: 'Tree frog.glb' },",
    r"fish: \{ sub: 'cc0', file: 'Fish\.glb' \},": r"fish: { sub: 'cc-by', file: 'Fish.glb' },",
    r"shark: \{ sub: 'cc0', file: 'Shark\.glb' \},": r"shark: { sub: 'cc-by', file: 'Shark.glb' },\n    eagleray: { sub: 'cc-by', file: 'Eagle ray family.glb' },",
    r"pufferfish: \{ sub: 'cc0', file: 'Pufferfish\.glb' \},": r"pufferfish: { sub: 'cc-by', file: 'Pufferfish.glb' },",
    r"bee: \{ sub: 'cc0', file: 'Bee\.glb' \},": r"bee: { sub: 'cc-by', file: 'Bee.glb' },",
    r"ladybug: \{ sub: 'cc0', file: 'Ladybird\.glb' \},": r"ladybug: { sub: 'cc-by', file: 'Ladybug.glb' },",
}

for old, new in replacements_glb.items():
    if not re.search(old, src_ar):
        print(f"WARN: could not find {old}")
    src_ar = re.sub(old, new, src_ar)


# Add into CC_BY_CREDITS in arRoutes.ts
new_credits = [
    "{ name: 'Bat', author: 'Poly by Google', url: 'https://poly.pizza/m/5_XBqyrOY7x' }",
    "{ name: 'Bee', author: 'jeremy', url: 'https://poly.pizza/m/6ktZgxSVVn1' }",
    "{ name: 'Cow', author: 'Poly by Google', url: 'https://poly.pizza/m/0OToIgkcVM7' }",
    "{ name: 'Deer', author: 'Poly by Google', url: 'https://poly.pizza/m/fUo4AIcd8XR' }",
    "{ name: 'Donkey', author: 'Poly by Google', url: 'https://poly.pizza/m/dv8Isf3WRlE' }",
    "{ name: 'Eagle Ray Family', author: 'Steren Giannini', url: 'https://poly.pizza/m/8oMbCGcf5Tk' }",
    "{ name: 'Fish', author: 'Poly by Google', url: 'https://poly.pizza/m/aEyLrUMMoUK' }",
    "{ name: 'Fox', author: 'Poly by Google', url: 'https://poly.pizza/m/10u8FYPC5Br' }",
    "{ name: 'Hamster', author: 'Poly by Google', url: 'https://poly.pizza/m/aRz6-f8rnMq' }",
    "{ name: 'Horse', author: 'Poly by Google', url: 'https://poly.pizza/m/5ocnVSh_ZF-' }",
    "{ name: 'Howling Wolf', author: 'Katia Ariadna Orozco Morales', url: 'https://poly.pizza/m/1srj6fW-Gi2' }",
    "{ name: 'Ladybug', author: 'Poly by Google', url: 'https://poly.pizza/m/4RkgtgojPCk' }",
    "{ name: 'Llama', author: 'Poly by Google', url: 'https://poly.pizza/m/5XUgcfxfBWJ' }",
    "{ name: 'Pig', author: 'Poly by Google', url: 'https://poly.pizza/m/6XC3XssJIU_' }",
    "{ name: 'Pufferfish', author: 'Poly by Google', url: 'https://poly.pizza/m/3tgZD06mzCe' }",
    "{ name: 'Rat', author: 'Poly by Google', url: 'https://poly.pizza/m/6hsesZHvcPI' }",
    "{ name: 'Shark', author: 'Poly by Google', url: 'https://poly.pizza/m/8Ke5qCnWxsZ' }",
    "{ name: 'Sheep', author: 'Poly by Google', url: 'https://poly.pizza/m/dXBMV4AY2DL' }",
    "{ name: 'Snake', author: 'Alex Safayan', url: 'https://poly.pizza/m/ehbKAsFUWdJ' }",
    "{ name: 'Tree Frog', author: 'Poly by Google', url: 'https://poly.pizza/m/cwyNyIba6WE' }",
    "{ name: 'Western Bluebird', author: 'Poly by Google', url: 'https://poly.pizza/m/cdcl5UwlYWd' }",
    "{ name: 'Zebra', author: 'Poly by Google', url: 'https://poly.pizza/m/8Ut7mhb-aqK' }",
]

# extract existing credits, sort them, replace the block
credits_match = re.search(r'(const CC_BY_CREDITS: Array<[^>]+> = \[\n)([\s\S]+?)(\n\];)', src_ar)
if credits_match:
    lines = credits_match.group(2).split('\n')
    lines = [l.strip() for l in lines if l.strip().endswith('},')]
    
    # Extract string dicts without comma
    credits_strs = []
    for l in lines:
        if l.endswith(','): l = l[:-1]
        credits_strs.append(l)

    for nc in new_credits:
        credits_strs.append(nc)

    # Sort lines alphabetically by name 
    # extract name with regex
    def get_name(s):
        m = re.search(r"name:\s*'([^']+)'", s)
        return m.group(1).lower() if m else s
        
    credits_strs.sort(key=get_name)
    
    new_credits_str = credits_match.group(1) + '    ' + ',\n    '.join(credits_strs) + ',' + credits_match.group(3)
    src_ar = src_ar[:credits_match.start()] + new_credits_str + src_ar[credits_match.end():]
else:
    print("WARN: CC_BY_CREDITS not found")

with open(ar_routes_path, 'w', encoding='utf-8') as f:
    f.write(src_ar)


# 2. Update ATTRIBUTION.md
attr_md_path = r'public\assets\ar-models\ATTRIBUTION.md'
with open(attr_md_path, 'r', encoding='utf-8') as f:
    attr_md = f.read()

models_md_new = [
    "| Bat.glb | Bat | Poly by Google | https://poly.pizza/m/5_XBqyrOY7x |",
    "| Bee.glb | Bee | jeremy | https://poly.pizza/m/6ktZgxSVVn1 |",
    "| Cow.glb | Cow | Poly by Google | https://poly.pizza/m/0OToIgkcVM7 |",
    "| Deer.glb | Deer | Poly by Google | https://poly.pizza/m/fUo4AIcd8XR |",
    "| Donkey.glb | Donkey | Poly by Google | https://poly.pizza/m/dv8Isf3WRlE |",
    "| Eagle ray family.glb | Eagle ray family | Steren Giannini | https://poly.pizza/m/8oMbCGcf5Tk |",
    "| Fish.glb | Fish | Poly by Google | https://poly.pizza/m/aEyLrUMMoUK |",
    "| Fox.glb | Fox | Poly by Google | https://poly.pizza/m/10u8FYPC5Br |",
    "| Hamster.glb | Hamster | Poly by Google | https://poly.pizza/m/aRz6-f8rnMq |",
    "| Horse.glb | Horse | Poly by Google | https://poly.pizza/m/5ocnVSh_ZF- |",
    "| Howling Wolf.glb | Howling Wolf | Katia Ariadna Orozco Morales | https://poly.pizza/m/1srj6fW-Gi2 |",
    "| Ladybug.glb | Ladybug | Poly by Google | https://poly.pizza/m/4RkgtgojPCk |",
    "| Llama.glb | Llama | Poly by Google | https://poly.pizza/m/5XUgcfxfBWJ |",
    "| Pig.glb | Pig | Poly by Google | https://poly.pizza/m/6XC3XssJIU_ |",
    "| Pufferfish.glb | Pufferfish | Poly by Google | https://poly.pizza/m/3tgZD06mzCe |",
    "| Rat.glb | Rat | Poly by Google | https://poly.pizza/m/6hsesZHvcPI |",
    "| Shark.glb | Shark | Poly by Google | https://poly.pizza/m/8Ke5qCnWxsZ |",
    "| Sheep.glb | Sheep | Poly by Google | https://poly.pizza/m/dXBMV4AY2DL |",
    "| Snake.glb | Snake | Alex Safayan | https://poly.pizza/m/ehbKAsFUWdJ |",
    "| Tree frog.glb | Tree frog | Poly by Google | https://poly.pizza/m/cwyNyIba6WE |",
    "| Western bluebird.glb | Western bluebird | Poly by Google | https://poly.pizza/m/cdcl5UwlYWd |",
    "| Zebra.glb | Zebra | Poly by Google | https://poly.pizza/m/8Ut7mhb-aqK |",
]

lines = attr_md.split('\n')
new_lines = []
for l in lines:
    if l.startswith('| '):
        new_lines.append(l)

tbl_start = attr_md.find('| Model File | Subject | Author | Poly Pizza Link |')
tbl_end = attr_md.find('---', tbl_start)

# extract only the table cells:
existing_table = attr_md[tbl_start:tbl_end].split('\n')
tbl_cells = [l for l in existing_table if l.startswith('|') and not l.startswith('|---')]
tbl_cells.pop(0) # remove header

for nc in models_md_new:
    tbl_cells.append(nc)

def get_md_name(s):
    return s.split('|')[1].strip().lower()

tbl_cells.sort(key=get_md_name)

new_tbl = "| Model File | Subject | Author | Poly Pizza Link |\n|---|---|---|---|\n" + "\n".join(tbl_cells) + "\n\n"
attr_md = attr_md[:tbl_start] + new_tbl + attr_md[tbl_end:]

attr_md = attr_md.replace(", Bat, Bee, Bird", "")
attr_md = attr_md.replace("Clownfish, Cow, Deer, Donkey, ", "Clownfish, ")
attr_md = attr_md.replace("Fish, Fly, Fox, Frog, Horse, Husky, Ladybird", "Fly, Husky")
attr_md = attr_md.replace("Lionfish, Llama, ", "Lionfish, ")
attr_md = attr_md.replace("Pig, Piranha, Pufferfish", "Piranha")
attr_md = attr_md.replace("Rat, Shark, Sheep, ", "")
attr_md = attr_md.replace("Shiba Inu, Snake, ", "Shiba Inu, ")
attr_md = attr_md.replace("Wolf, Zebra", "")
# Some might leave trailing spaces, fix up
attr_md = re.sub(r',\s*,', ',', attr_md)
with open(attr_md_path, 'w', encoding='utf-8') as f:
    f.write(attr_md)


# 3. Update ATTRIBUTION.json
attr_json_path = r'public\assets\ar-models\ATTRIBUTION.json'
with open(attr_json_path, 'r', encoding='utf-8') as f:
    attr_json = f.read()

models_json_new = [
    '{ "file": "Bat.glb", "name": "Bat", "author": "Poly by Google", "url": "https://poly.pizza/m/5_XBqyrOY7x" }',
    '{ "file": "Bee.glb", "name": "Bee", "author": "jeremy", "url": "https://poly.pizza/m/6ktZgxSVVn1" }',
    '{ "file": "Cow.glb", "name": "Cow", "author": "Poly by Google", "url": "https://poly.pizza/m/0OToIgkcVM7" }',
    '{ "file": "Deer.glb", "name": "Deer", "author": "Poly by Google", "url": "https://poly.pizza/m/fUo4AIcd8XR" }',
    '{ "file": "Donkey.glb", "name": "Donkey", "author": "Poly by Google", "url": "https://poly.pizza/m/dv8Isf3WRlE" }',
    '{ "file": "Eagle ray family.glb", "name": "Eagle ray family", "author": "Steren Giannini", "url": "https://poly.pizza/m/8oMbCGcf5Tk" }',
    '{ "file": "Fish.glb", "name": "Fish", "author": "Poly by Google", "url": "https://poly.pizza/m/aEyLrUMMoUK" }',
    '{ "file": "Fox.glb", "name": "Fox", "author": "Poly by Google", "url": "https://poly.pizza/m/10u8FYPC5Br" }',
    '{ "file": "Hamster.glb", "name": "Hamster", "author": "Poly by Google", "url": "https://poly.pizza/m/aRz6-f8rnMq" }',
    '{ "file": "Horse.glb", "name": "Horse", "author": "Poly by Google", "url": "https://poly.pizza/m/5ocnVSh_ZF-" }',
    '{ "file": "Howling Wolf.glb", "name": "Howling Wolf", "author": "Katia Ariadna Orozco Morales", "url": "https://poly.pizza/m/1srj6fW-Gi2" }',
    '{ "file": "Ladybug.glb", "name": "Ladybug", "author": "Poly by Google", "url": "https://poly.pizza/m/4RkgtgojPCk" }',
    '{ "file": "Llama.glb", "name": "Llama", "author": "Poly by Google", "url": "https://poly.pizza/m/5XUgcfxfBWJ" }',
    '{ "file": "Pig.glb", "name": "Pig", "author": "Poly by Google", "url": "https://poly.pizza/m/6XC3XssJIU_" }',
    '{ "file": "Pufferfish.glb", "name": "Pufferfish", "author": "Poly by Google", "url": "https://poly.pizza/m/3tgZD06mzCe" }',
    '{ "file": "Rat.glb", "name": "Rat", "author": "Poly by Google", "url": "https://poly.pizza/m/6hsesZHvcPI" }',
    '{ "file": "Shark.glb", "name": "Shark", "author": "Poly by Google", "url": "https://poly.pizza/m/8Ke5qCnWxsZ" }',
    '{ "file": "Sheep.glb", "name": "Sheep", "author": "Poly by Google", "url": "https://poly.pizza/m/dXBMV4AY2DL" }',
    '{ "file": "Snake.glb", "name": "Snake", "author": "Alex Safayan", "url": "https://poly.pizza/m/ehbKAsFUWdJ" }',
    '{ "file": "Tree frog.glb", "name": "Tree frog", "author": "Poly by Google", "url": "https://poly.pizza/m/cwyNyIba6WE" }',
    '{ "file": "Western bluebird.glb", "name": "Western bluebird", "author": "Poly by Google", "url": "https://poly.pizza/m/cdcl5UwlYWd" }',
    '{ "file": "Zebra.glb", "name": "Zebra", "author": "Poly by Google", "url": "https://poly.pizza/m/8Ut7mhb-aqK" }',
]

match_json = re.search(r'("models": \[\n)([\s\S]+?)(\n\s*\])', attr_json)
if match_json:
    lines = match_json.group(2).split('\n')
    lines = [l.strip() for l in lines if l.strip()]
    
    jcells = []
    for l in lines:
        if l.endswith(','): l = l[:-1]
        jcells.append(l)

    for nc in models_json_new:
        jcells.append(nc)

    def get_jname(s):
        m = re.search(r'"name":\s*"([^"]+)"', s)
        return m.group(1).lower() if m else s

    jcells.sort(key=get_jname)
    
    new_jcells_str = match_json.group(1) + '    ' + ',\n    '.join(jcells) + match_json.group(3)
    attr_json = attr_json[:match_json.start()] + new_jcells_str + attr_json[match_json.end():]

with open(attr_json_path, 'w', encoding='utf-8') as f:
    f.write(attr_json)

print("Patching complete!")
