import json
import urllib.parse
import urllib.request

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36'
}

names = [
    'Jardin d\'Essai du Hamma',
    'Sablettes Beach',
    'Marina Sidi Fredj',
    'Belvédère El Aurassi',
    'Parc Zoologique Oued Smar',
    'Musée du Bardo Alger',
    'Zeralda',
    'Palais des Rais',
    'Parc d\'Attractions Smar',
    'Stade du 5 Juillet 1962',
    'Plage de Madagh',
    'Fort Santa Cruz Oran',
    'Corniche Oran',
    'Plage les Andalouses',
    'Théâtre d\'Oran',
    'Chapelle Santa Cruz',
    'Musée Ahmed Zabana',
    'Promenade de l\'Étang Oran',
    'Ghoufi Canyon',
    'Musée de Timgad',
    'Tombeau de Medracen',
    'Belezma National Park',
    'Hammam Salihine',
    'Theniet El Abed waterfall',
    'Mont Tichaou',
    'Tassili n\'Ajjer',
    'Plateau de Fadnoun',
]

base = 'https://en.wikipedia.org/w/api.php'

for name in names:
    params = {
        'action': 'query',
        'list': 'search',
        'srsearch': name,
        'format': 'json',
        'srlimit': 2,
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
        continue
    if not data.get('query', {}).get('search'):
        print(name, 'NO RESULTS')
        continue
    for item in data['query']['search']:
        pageid = item['pageid']
        title = item['title']
        params2 = {
            'action': 'query',
            'pageids': pageid,
            'prop': 'pageimages|images',
            'format': 'json',
            'piprop': 'original',
            'pilicense': 'any'
        }
        url2 = base + '?' + urllib.parse.urlencode(params2)
        req2 = urllib.request.Request(url2, headers=headers)
        try:
            with urllib.request.urlopen(req2, timeout=20) as resp2:
                data2 = json.loads(resp2.read().decode('utf-8'))
        except Exception as e:
            print(name, title, 'PAGE ERROR', e)
            continue
        page = data2['query']['pages'].get(str(pageid), {})
        original = page.get('original', {}).get('source')
        print(name, '->', title, original)
    print('---')
