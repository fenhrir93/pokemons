import { Search } from "@mui/icons-material";
import { Input, Option, Select } from "@mui/joy";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetPokemonsTypeQuery } from "../../services/serivces";

function PokemonSearch({
  onPokemonTypeFilter,
}: {
  onPokemonTypeFilter: (value: string) => void;
}) {
  const [pokemonToSearch, setPokemonToSearch] = useState("");
  const { data } = useGetPokemonsTypeQuery();

  const navigation = useNavigate();

  const handle = () => {
    navigation(`/details/${pokemonToSearch}`);
  };

  const onPokemonTypeFilterHandler = (value: string | null) => {
    if (!value) return;
    onPokemonTypeFilter(value);
  };

  let content = <p>Loading...</p>;

  if (data && Array.isArray(data?.results)) {
    content = (
      <>
        <Select
          placeholder="Filter pokemons by type"
          onChange={(_, value: string | null) =>
            onPokemonTypeFilterHandler(value)
          }
        >
          {data?.results.map((pokemon) => (
            <Option key={pokemon.name} value={pokemon.name}>
              {pokemon.name}
            </Option>
          ))}
        </Select>
        <Input
          placeholder="Search pokemons"
          variant="soft"
          onChange={(e) => setPokemonToSearch(e.target.value)}
          color="primary"
          endDecorator={<Search onClick={handle} />}
        />
      </>
    );
  }

  return <div>{content}</div>;
}
export default PokemonSearch;
