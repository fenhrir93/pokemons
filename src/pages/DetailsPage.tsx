import { useParams } from "react-router-dom";
import { PokemonDetail } from "../components/PokemonDetail";
import { useGetPokemonByNameQuery } from "../services/serivces";

export const DetailsPage = () => {
  const { name } = useParams() as { name: NonNullable<string> };
  const { data, isLoading } = useGetPokemonByNameQuery(name);

  return <>{!isLoading && <PokemonDetail data={data} name={name} />}</>;
};
