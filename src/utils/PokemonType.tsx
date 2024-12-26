interface PokemonType {
    id: number;
    name: {
        english: string;
        french?: string;
    };
    type: string[];
    base: {
        HP: number;
        Attack: number;
        Defense: number;
        "Sp. Attack": number;
        "Sp. Defense": number;
        Speed: number;
    };
    abilities: string[];
    coverage: {
        normal: number;
        fire: number;
        water: number;
        electric: number;
        grass: number;
        ice: number;
        fighting: number;
        poison: number;
        ground: number;
        flying: number;
        psychic: number;
        bug: number;
        rock: number;
        ghost: number;
        dragon: number;
        dark: number;
        steel: number;
        fairy: number;
    };
    evo: {
        evochain_0?: string;
        evochain_1?: string;
        evochain_2?: string;
        evochain_3?: string;
        evochain_4?: string;
        evochain_5?: string;
        evochain_6?: string;
        gigantamax?: string;
        mega_evolution?: string;
        mega_evolution_alt?: string;
    };
    info: {
        classification: string;
        percent_male?: number;
        percent_female?: number;
        height_m?: number;
        weight_kg?: number;
        description?: string;
        is_sublegendary: number;
        is_legendary: number;
        is_mythical: number;
    };
    sprites: {
        default: string;
    };
    glft: boolean;
}

export default PokemonType;