import { ReactElement, useState } from "react";
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

  let content: ReactElement = <p>Loading...</p>;

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

  if (
    data &&
    Array.isArray(data?.results) &&
    typedPokemons &&
    Array.isArray(typedPokemons?.pokemon)
  ) {
    content = (
      <InfiniteScroll
        dataLength={data.results.length}
        next={onNextHandler}
        hasMore={data.count !== data.results.length}
        loader={mode && <p>Loading...</p>}
        scrollableTarget="scrollableDiv"
      >
        {pokemonsType &&
          typedPokemons.pokemon.length > 0 &&
          typedPokemons.pokemon.map(({ name }) => {
            return (
              <Link
                to={`/details/${name}`}
                key={name}
                style={{ marginBottom: 4, display: "block" }}
              >
                <PokemonCard key={name}>{name}</PokemonCard>
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
    );
  }

  return (
    <>
      <PokemonSearch onPokemonTypeFilter={onPokemonTypeFilter} />
      {data?.results && (
        <div
          id="scrollableDiv"
          style={{
            overflow: "auto",
            width: "70dvw",
            height: "60dvh",
          }}
        >
          {content}
        </div>
      )}
    </>
  );
};
export default PokemonList;
