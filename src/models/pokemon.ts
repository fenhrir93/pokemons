interface Move {
  move: {
    name: string;
    url: string;
  };
}

export interface PokemonType {
  name: string;
  url: string;
}

interface Sprites {
  back_default: string | null;
  back_female: string | null;
  back_shiny: string | null;
  back_shiny_female: string | null;
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
}

export interface Pokemon {
  name: string;
  moves: Move[];
  types: PokemonType[];
  sprites: Sprites;
}
