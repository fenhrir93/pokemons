import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PokemonDetail } from "../components/PokemonDetail";
import { Pokemon } from "../models/pokemon";

export const DetailsPage = () => {
  const [pokemon, setPokemon] = useState<Pokemon>({} as Pokemon);
  const [isLoading, setIsLoading] = useState(true);
  const { name } = useParams();
  console.log(name);
  useEffect(() => {
    axios
      .get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then(async (res) => {
        console.log(res.data);
        setPokemon(res.data);
        setIsLoading(false);
      });
  }, [name]);

  return <>{!isLoading && <PokemonDetail pokemon={pokemon} />}</>;
};
