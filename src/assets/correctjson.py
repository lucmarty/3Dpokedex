# Lire le fichier corrigé
with open('pokemons.json', 'r', encoding='utf-8') as file:
    content = file.read()

# Corriger les artefacts restants
replacements = {
    "PokÃ©mon": "Pokémon",
    "Ã©": "é",
    "Ã¨": "è",
    "Ãª": "ê",
    "Ã‰": "É",
    "Ã¯" : "ï",
    "Ã´" : "ô",
    "Ã»" : "û",
    "Ã§" : "ç",
    "Ã¢" : "â",
    "â€™" : "'",
    "â™€": "♀",
    "â™‚": "♂",
    "â€”": "—",
    "â€œ": "“",
    "â€": "”",
    "â€“": "–",
    
}

for key, value in replacements.items():
    content = content.replace(key, value)

# Sauvegarder le fichier nettoyé
with open('pokemons.json', 'w', encoding='utf-8') as file:
    file.write(content)

print("Fichier nettoyé et sauvegardé sous 'cleaned_output.json'.")
