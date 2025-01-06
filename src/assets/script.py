import json

# Read the data from the original file
with open("pokemons.json", "r", encoding='utf-8') as f:
    data = json.load(f)

# Modify the data by adding 'glft' based on the condition
for pokemon in data: 
    print(pokemon["id"])
    if pokemon["id"] <= 152:
        pokemon["glft"] = True
    else:
        pokemon["glft"] = False

# Write the modified data to a new file
with open('pokemons2.json', 'w', encoding='utf-8') as file:
    json.dump(data, file, ensure_ascii=False, indent=4)
