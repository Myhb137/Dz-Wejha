import json
import time
import urllib.parse
import urllib.request

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36'
}

names = [
    'Sablettes Beach',
    'Belvédère El Aurassi',
    'Parc Zoologique Oued Smar',
    'Parc d\'Attractions Smar',
    'Plage de Madagh',
    'Corniche Oran',
    'Plage les Andalouses',
    'Théâtre d\'Oran',
    'Chapelle Santa Cruz Oran',
    'Promenade de l\'Étang Oran',
    'Ghoufi Canyon',
    'Musée de Timgad',
    'Tombeau de Medracen',
    'Forêt de Belezma',
    'Cascades de Theniet El Abed',
    'Mont Tichaou',
    'Hammam Salihine',
    'Tassili n\'Ajjer',
    'Plateau de Fadnoun',
]

base = 'https://commons.wikimedia.org/w/api.php'

for name in names:
    print('===', name)
    params = {
        'action': 'query',
        'list': 'search',
        'srsearch': name,
        'srnamespace': 6,
        'format': 'json',
        'srlimit': 5,
        'srprop': '',
        'utf8': ''
    }
    url = base + '?' + urllib.parse.urlencode(params)
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=20) as resp:
            data = json.loads(resp.read().decode('utf-8'))
    except Exception as e:
        print(name, 'SEARCH ERROR', e)
        time.sleep(5)
        continue
    results = data.get('query', {}).get('search', [])
    if not results:
        print(name, 'NO RESULTS')
        time.sleep(5)
        continue
    for item in results:
        title = item['title']
        file_title = title.replace('File:', '')
        params2 = {
            'action': 'query',
            'titles': title,
            'prop': 'imageinfo',
            'iiprop': 'url',
            'format': 'json',
            'utf8': ''
        }
        url2 = base + '?' + urllib.parse.urlencode(params2)
        req2 = urllib.request.Request(url2, headers=headers)
        try:
            with urllib.request.urlopen(req2, timeout=20) as resp2:
                data2 = json.loads(resp2.read().decode('utf-8'))
        except Exception as e:
            print(' ', title, 'PAGE ERROR', e)
            continue
        page = next(iter(data2['query']['pages'].values()))
        imageinfo = page.get('imageinfo', [{}])[0].get('url')
        print(' ', file_title, imageinfo)
    time.sleep(5)
