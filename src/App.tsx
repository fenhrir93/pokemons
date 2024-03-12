import { Pagination } from "@mui/material";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import cls from "./App.module.scss";
import { PokemonCard } from "./components/PokemonCard";
import { PokemonType } from "./models/pokemon";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { getPokemons } from "./store/pokemonSlice";
import { RootState } from "./store/store";

function App() {
  console.log("APP");
  // const [pokemons, setPokemons] = useState([]);
  const [typedPokemons, setTypedPokemons] = useState([]);
  const [pokemonsType, setPokemonsType] = useState([]);
  const [pokemonType, setPokemonType] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const dispatch = useAppDispatch();
  const { pokemons, pages } = useAppSelector(
    (state: RootState) => state.pokemon
  );

  useEffect(() => {
    dispatch(getPokemons(page));
  }, [page, dispatch]);

  useEffect(() => {
    axios
      .get<AxiosResponse<PokemonType[]>>(`https://pokeapi.co/api/v2/type`)
      .then((res) => {
        setPokemonsType(res.data.results);
        setIsLoading(false);
        console.log(res.data.results);
      });
  }, []);

  useEffect(() => {
    if (pokemonType) {
      axios.get(`https://pokeapi.co/api/v2/type/${pokemonType}`).then((res) => {
        setIsLoading(false);
        setTypedPokemons(res.data.pokemon);
      });
    }
  }, [pokemonType]);

  const onHandleTypeChange = (e) => {
    setPokemonType(e.target.value.name);
  };

  return (
    <>
      {isLoading && <p>Loading...</p>}
      <div className={cls.container}>
        {/* <Select defaultValue={{ name: "All" }} onChange={onHandleTypeChange}>
          {pokemonsType.map((pokemon) => (
            <MenuItem key={pokemon.name} value={pokemon}>
              {pokemon.name}
            </MenuItem>
          ))}
        </Select> */}
        {!pokemonType &&
          pokemons.map((pokemon) => (
            <Link to={`/details/${pokemon.name}`} key={pokemon.name}>
              <PokemonCard key={pokemon.name}>{pokemon.name}</PokemonCard>
            </Link>
          ))}
        {!pokemonType && (
          <Pagination
            color="primary"
            style={{ minWidth: "fit-content" }}
            variant="outlined"
            shape="rounded"
            defaultPage={1}
            count={pages}
            size="large"
            showFirstButton
            showLastButton
            page={page}
            onChange={(e, page) => {
              setPage(page);
            }}
          />
        )}
        {pokemonType &&
          typedPokemons.map(({ pokemon }) => (
            <PokemonCard key={pokemon.name}>
              <p>{pokemon.name}</p>
            </PokemonCard>
          ))}
      </div>
    </>
  );
}

export default App;
