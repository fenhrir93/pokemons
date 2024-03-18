import { Link } from "react-router-dom";
import { useGetPokemonsTypeQuery } from "../../services/serivces";
import { PokemonCard } from "../PokemonCard/PokemonCard";

const PokemonTypes = () => {
  const { data, isLoading } = useGetPokemonsTypeQuery();
  if (!(data && Array.isArray(data?.results))) {
    throw new Error("No results");
  }

  return (
    <div>
      {!isLoading &&
        data?.results.map((pokemon) => (
          <Link
            to={`/details/${pokemon.name}`}
            key={pokemon.name}
            style={{ marginBottom: 4, display: "block" }}
          >
            <PokemonCard key={pokemon.name}>{pokemon.name}</PokemonCard>
          </Link>
        ))}
    </div>
  );
};
export default PokemonTypes;
