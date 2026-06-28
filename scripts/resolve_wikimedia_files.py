import time
import urllib.parse
import urllib.request
from pathlib import Path

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36'
}

files = [
    'Jardin_d%27essai_du_Hamma.jpg',
    'Plage_des_Sablettes_%C3%A0_Alger.JPG',
    'Sidi_Fredj_Marina_22.jpg',
    'Alger_vue_h%C3%B4tel_el_aurrasi.jpg',
    'Bardo_National_Museum.jpg',
    'Palais_des_Ra%C3%AEs_01.jpg',
    'Plage_madagh_2%C3%A9me_,_Oran_,_Algerie.jpg',
    'Th%C3%A9%C3%A2tre_R%C3%A9gional_d%27Oran_beaut%C3%A9.jpg',
    'Chapelle_de_Santa_Cruz_%28Oran%29_04.jpg',
    'Mus%C3%A9e_national_d%27Oran.jpg',
    'Promenade_de_l%27Etang.jpg',
    'Canyon_de_Ghoufi_06.jpg',
    'TOMBEAU_MEDRACEN.jpg',
    'Plage_des_andalouses_Oran.jpg',
    'Fort_Santa_Cruz_Oran_5.jpg',
    'Fadnounplateau_vers_Illizi.jpg',
    'Djanet_tassili_n%27ajjers.JPG',
    'Tassili_n%27Ajjer_-_panoramio.jpg',
    'Hammame_Salhine_3_%D8%AD%D9%85%D8%A7%D9%85_%D8%A7%D9%84%D8%B5%D8%A7%D9%84%D8%AD%D9%8A%D9%86_-_panoramio.jpg',
    'Tassili_rock_art2.jpg',
    'Djanet_Oasis.jpg',
    'Essendilene.jpg',
    'Tassili_Desert_Algeria.jpg',
    'Tassili_n%27Ajjer_-_panoramio.jpg',
]

for file_name in sorted(set(files)):
    url = 'https://commons.wikimedia.org/wiki/Special:FilePath/' + file_name
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=20) as resp:
            print(file_name, '->', resp.geturl())
    except Exception as exc:
        print(file_name, 'ERROR', exc)
    time.sleep(1)
