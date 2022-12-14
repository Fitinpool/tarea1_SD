from time import time
from unicodedata import name
import requests
from bs4 import BeautifulSoup

# ------------------- READ_TXT ------------------- #
def read_csv(path, max_lines=None):
       
    with open(path, 'r') as f:
        cont = 0
        lines = f.readlines()[1:]
        f = open ('data.sql','w')
        for line in lines:
            if (cont == max_lines):
                return
            tab = line.split('\t')
            #print("tab: ")
            #print(tab)
            # ------------------Evitamos las url en blanco. Es \n porque es el último término antes de un salto de linea.------------------ #
            if tab[4] == '\n':
                continue
            url = tab[4]
            #print("url: ")
            #print(url)
            # ------------------Evitamos el salto de linea.------------------ #
            c_url = url[:-1]
            #print("curl: ")
            #print(c_url)
            
            data = getDataFromUrl(c_url)
            #print(data)
            if data is not None:
                #print(f'[{cont}] {data["url"]}\n Title: {repr(data["title"])}\n Description: {repr(data["description"])}\n Keywords: {repr(data["keywords"])}')
                #f.write(f'Title: {repr(data["title"])}\n Description: {repr(data["description"])}\n Keywords: {repr(data["keywords"])}\n')
                f.write(f'insert into crawler(title, description, keywords, url) values ({repr(data["title"])}, {repr(data["description"])}, {repr(data["keywords"])}, {repr(data["url"])});\n')
                print('metido coño!')
                cont += 1
        
        f.close()
    return 

# ------------------- SCRAPING ------------------- #
def getDataFromUrl(url):
    collected_data = {'url': url, 'title': None, 'description': None, 'keywords': None}
    try:
        r = requests.get(url, timeout=1)
    except Exception:
        return None

    if r.status_code == 200:
        
        # Se puede usar BeautifulSoap u otra librería que parsee la metadata de los docuementos HTML.
        source = requests.get(url).text
        soup = BeautifulSoup(source, features='html.parser')

        # Se otienes las etiquetas meta
        meta = soup.find("meta")
            
        # Obtenemos el título
        title = soup.find('title')
        #title = title['content'] if title else None
        
        # Obtenemos la descripción
        description = soup.find("meta", {'name': "description"})
        #description = description['content'] if description else None
        
        # Obtenemos la keywords y las limpiamos
        keywords = soup.find("meta", {'name': "keywords"})
        #keywords = keywords['content'] if keywords else None
        

        try:
            if keywords is None:
                return None
            else:
        
                description = description['content'] if description else None
                keywords = keywords['content'] if keywords else None
                
                keywords = keywords.replace(" ", "") if keywords else None
                keywords = keywords.replace(".", "") if keywords else None
                #keywords = keywords.split(",") if keywords else None  
                    
                
        except Exception:
            return None
        title = title.get_text().replace("\n","") if title else None
        title = title.replace("\r","") if title else None
        title = title.replace("\t","") if title else None
        collected_data['title'] = title
        collected_data['description'] = description
        collected_data['keywords'] = keywords 
        if collected_data['keywords'] is None:
                return None
        return collected_data
          
    return None


# ------------------- MAIN ------------------- #
if __name__ == '__main__':
    path = './logs/data.txt'
    read_csv(path, 3614507)
    
    #url = 'https://www.styleweekly.com'
    #data = getDataFromUrl(url)
    #print(data)