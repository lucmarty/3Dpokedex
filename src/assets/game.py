import requests
import json
import re

# URL de l'API
url = "https://pokeapi.co/api/v2/pokedex/15"

try:
    # Envoyer une requête GET à l'API
    response = requests.get(url)
    response.raise_for_status()

    # Extraire les données JSON
    data = response.json()

    # Récupérer le nom dans version_groups
    version_group_name = data.get("version_groups", [])[0].get("name", "unknown")

    # Extraire uniquement les entrées des Pokémon
    pokemon_entries = data.get("pokemon_entries", [])

    # Reformater les données
    simplified_pokedex = {
        version_group_name: {
            "pokedex": [
                {"id": int(re.search(r'/(\d+)/$', entry["pokemon_species"]["url"]).group(1))}
                for entry in pokemon_entries
            ]
        }
    }

    # Nom du fichier de sortie
    filename = version_group_name + ".json"

    # Écrire les données simplifiées dans un fichier
    with open(filename, 'w', encoding='utf-8') as file:
        json.dump(simplified_pokedex, file, ensure_ascii=False, indent=4)

    print(f"Les données simplifiées avec le nom '{version_group_name}' ont été enregistrées dans le fichier '{filename}'.")

except requests.exceptions.RequestException as e:
    print(f"Une erreur est survenue lors de la requête : {e}")
except Exception as e:
    print(f"Une erreur inattendue est survenue : {e}")
