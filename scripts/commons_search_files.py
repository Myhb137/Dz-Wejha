import re
import time
import urllib.parse
import urllib.request

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36'
}

queries = [
    'Plage des Sablettes Alger',
    'Belvéd%C3%A9re El Aurassi Alger',
    'Parc Zoologique Oued Smar',
    'Parc d\'Attractions Smar',
    'Plage de Madagh Oran',
    'Corniche Oran',
    'Plage des Andalouses Oran',
    'Théâtre d\'Oran',
    'Chapelle Santa Cruz Oran',
    'Promenade de l\'Etang Oran',
    'Ghoufi Canyon',
    'Musée de Timgad',
    'Tombeau de Medracen',
    'Forêt de Belezma',
    'Cascades de Theniet El Abed',
    'Mont Tichaou',
    'Hammam Salihine',
    'Tassili n\'Ajjer',
    'Plateau de Fadnoun',
    'Musée national du Bardo Alger'
]

for q in queries:
    print('===', q)
    query = q.replace("'", "%27")
    url = f'https://commons.wikimedia.org/w/index.php?search={urllib.parse.quote(q)}&title=Special:Search&profile=default&fulltext=1&ns6=1'
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=20) as resp:
            html = resp.read().decode('utf-8', errors='ignore')
    except Exception as e:
        print('SEARCH ERROR', e)
        time.sleep(5)
        continue
    matches = re.findall(r'href="/wiki/File:([^"]+)"', html)
    seen = []
    for file_name in matches:
        if file_name not in seen:
            seen.append(file_name)
        if len(seen) >= 10:
            break
    if not seen:
        print(' NO RESULTS')
    else:
        for file_name in seen:
            print(' ', file_name)
    time.sleep(5)
