import json
import requests
from bs4 import BeautifulSoup


# Function to scrape data from a given URL
def scrape_pokemon_data(url):
    # Send a GET request to the URL
    response = requests.get(url)

    # Check if the request was successful
    if response.status_code != 200:
        print(f"Failed to retrieve the webpage. Status code: {response.status_code}")
        return []

    # Parse the HTML content
    soup = BeautifulSoup(response.content, 'html.parser')

    # Find all span components with class 'infocard-lg-data'
    infocard_data = soup.find_all('span', class_='infocard-lg-data')

    # List to store the extracted data
    pokemon_data = []

    # Iterate through each infocard-lg-data span
    for infocard in infocard_data:
        # Extract the number and name
        number = infocard.find('small').get_text(strip=True).replace('#', '').zfill(3)
        name = infocard.find('a').get_text(strip=True)

        # Append the data to the list as a dictionary
        pokemon_data.append({'number': number, 'name': name})

    return pokemon_data


# Function to extract collection names from URL
def extract_collection_names(url):
    collection_name = url.rstrip('/').split('/')[-1]
    if collection_name == "black-white-2":
        return ["black2", "white2"]
    return collection_name.split('-')
# List of URLs to scrape
urls = [
    'https://pokemondb.net/pokedex/game/red-blue-yellow',
    'https://pokemondb.net/pokedex/game/gold-silver-crystal',
    'https://pokemondb.net/pokedex/game/ruby-sapphire-emerald',
    'https://pokemondb.net/pokedex/game/firered-leafgreen',
    'https://pokemondb.net/pokedex/game/diamond-pearl',
    'https://pokemondb.net/pokedex/game/platinum',
    'https://pokemondb.net/pokedex/game/heartgold-soulsilver',
    'https://pokemondb.net/pokedex/game/black-white',
    'https://pokemondb.net/pokedex/game/black-white-2',
    'https://pokemondb.net/pokedex/game/x-y',
    'https://pokemondb.net/pokedex/game/omega-ruby-alpha-sapphire',
    'https://pokemondb.net/pokedex/game/sun-moon',
    'https://pokemondb.net/pokedex/game/ultra-sun-ultra-moon',
    'https://pokemondb.net/pokedex/game/lets-go-pikachu-eevee',
    'https://pokemondb.net/pokedex/game/sword-shield',
    'https://pokemondb.net/pokedex/game/brilliant-diamond-shining-pearl',
    'https://pokemondb.net/pokedex/game/legends-arceus',
    'https://pokemondb.net/pokedex/game/scarlet-violet'
    # Add more URLs as needed
]

# Dictionary to hold the final JSON data
all_pokemon_data = {}

# Scrape data for each URL and store in the dictionary
for url in urls:
    collection_names = extract_collection_names(url)
    pokemon_data = scrape_pokemon_data(url)
    for collection_name in collection_names:
        all_pokemon_data[collection_name] = pokemon_data

# Write the data to a JSON file
with open('pokemon_data.json', 'w') as json_file:
    json.dump(all_pokemon_data, json_file, indent=4)

print("Data has been successfully exported to pokemon_data.json")