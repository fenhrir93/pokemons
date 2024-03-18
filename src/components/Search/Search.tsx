import { Search } from "@mui/icons-material";
import { Input, Option, Select } from "@mui/joy";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetPokemonsTypeQuery } from "../../services/serivces";

function PokemonSearch({ onPokemonTypeFilter }: (value: string) => void) {
  const [pokemonToSearch, setPokemonToSearch] = useState("");
  const { data, isLoading } = useGetPokemonsTypeQuery();

  const navigation = useNavigate();
  const handle = () => {
    navigation(`/details/${pokemonToSearch}`);
  };

  const onPokemonTypeFilterHandler = (e, value) => {
    onPokemonTypeFilter(value);
  };

  return (
    <div>
      {isLoading && <p>loading</p>}
      <Select
        placeholder="Filter pokemons by type"
        onChange={onPokemonTypeFilterHandler}
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
    </div>
  );
}
export default PokemonSearch;
