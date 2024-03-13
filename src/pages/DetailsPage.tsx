import { useParams } from "react-router-dom";
import { PokemonDetail } from "../components/PokemonDetail";
import { useGetPokemonDetailsQuery } from "../services/serivces";

export const DetailsPage = () => {
  const { name } = useParams() as { name: NonNullable<string> };
  const { data, isLoading } = useGetPokemonDetailsQuery(name);
  console.log(data);

  return <>{!isLoading && <PokemonDetail pokemon={data} />}</>;
};
