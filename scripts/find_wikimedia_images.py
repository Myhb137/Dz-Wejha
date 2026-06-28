import json
import re
import urllib.parse
import urllib.request
from pathlib import Path

file_path = Path('src/data/sites.ts')
text = file_path.read_text(encoding='utf-8')
pattern = re.compile(r"\{\s*id:\s*(\d+),\s*name:\s*\"([^\"]+)\".*?image:\s*\"(https?://[^\"]+)\".*?\}\s*", re.S)
entries = []
for m in pattern.finditer(text):
    id_ = int(m.group(1))
    name = m.group(2)
    url = m.group(3)
    entries.append((id_, name, url))

print(f'Found {len(entries)} remote image entries')
for id_, name, url in entries[:20]:
    print(id_, name, url)

# function to search wiki page and get pageimage

def wiki_image_for_term(term):
    base = 'https://en.wikipedia.org/w/api.php'
    params = {
        'action': 'query',
        'list': 'search',
        'srsearch': term,
        'format': 'json',
        'srlimit': 1,
    }
    url = base + '?' + urllib.parse.urlencode(params)
    try:
        data = json.loads(urllib.request.urlopen(url, timeout=20).read().decode('utf-8'))
    except Exception as exc:
        return None, f'search error {exc}'
    if not data.get('query', {}).get('search'):
        return None, 'no wiki page'
    pageid = data['query']['search'][0]['pageid']
    # get pageimage
    params = {
        'action': 'query',
        'pageids': pageid,
        'prop': 'pageimages|pageprops',
        'format': 'json',
        'piprop': 'original',
    }
    url2 = base + '?' + urllib.parse.urlencode(params)
    try:
        data2 = json.loads(urllib.request.urlopen(url2, timeout=20).read().decode('utf-8'))
    except Exception as exc:
        return None, f'page error {exc}'
    page = data2.get('query', {}).get('pages', {}).get(str(pageid), {})
    img = page.get('original', {}).get('source')
    return img, page.get('title')

for id_, name, url in entries[:40]:
    img, info = wiki_image_for_term(name)
    print(id_, name, '->', info, img)
