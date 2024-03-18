import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import {
  useGetPokemonsQuery,
  useGetTypedPokemonsQuery,
} from "../../services/serivces";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setOffset } from "../../store/paginationSlice";
import { PokemonCard } from "../PokemonCard";
import PokemonSearch from "../Search/Search";

const PokemonList = () => {
  const dispatch = useAppDispatch();
  const { page } = useAppSelector((state) => state.pagination);
  const [mode, setMode] = useState(true);
  const [pokemonsType, setPokemonsType] = useState("");

  const { data, isLoading } = useGetPokemonsQuery(page);

  const { data: typedPokemons } = useGetTypedPokemonsQuery(pokemonsType, {
    skip: pokemonsType.length === 0,
  });

  const onNextHandler = () => {
    if (!mode) return;
    dispatch(setOffset());
  };

  const onPokemonTypeFilter = (type: string) => {
    setPokemonsType(type);
    setMode(false);
  };

  return (
    <>
      <PokemonSearch onPokemonTypeFilter={onPokemonTypeFilter} />
      {data && (
        <div
          id="scrollableDiv"
          style={{
            overflow: "auto",
            width: "70dvw",
            height: "60dvh",
          }}
        >
          <InfiniteScroll
            dataLength={data.results.length}
            next={onNextHandler}
            hasMore={data.count !== data.results.length}
            loader={mode && <p>Loading...</p>}
            scrollableTarget="scrollableDiv"
          >
            {pokemonsType &&
              typedPokemons?.pokemon?.map(({ pokemon }) => {
                return (
                  <Link
                    to={`/details/${pokemon.name}`}
                    key={pokemon.name}
                    style={{ marginBottom: 4, display: "block" }}
                  >
                    <PokemonCard key={pokemon.name}>{pokemon.name}</PokemonCard>
                  </Link>
                );
              })}
            {!isLoading &&
              !pokemonsType &&
              data?.results.map((pokemon) => (
                <Link
                  to={`/details/${pokemon.name}`}
                  key={pokemon.name}
                  style={{ marginBottom: 4, display: "block" }}
                >
                  <PokemonCard key={pokemon.name}>{pokemon.name}</PokemonCard>
                </Link>
              ))}
          </InfiniteScroll>
        </div>
      )}
    </>
  );
};
export default PokemonList;
