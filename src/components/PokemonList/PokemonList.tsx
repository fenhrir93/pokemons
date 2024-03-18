import { ReactElement, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link, useParams } from "react-router-dom";
import { Pokemon } from "../../models/pokemon";
import {
  useGetPokemonsQuery,
  useGetTypedPokemonsQuery,
} from "../../services/serivces";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setOffset } from "../../store/paginationSlice";
import { PokemonCard } from "../PokemonCard/PokemonCard";
import PokemonSearch from "../Search/Search";

const PokemonList = () => {
  const dispatch = useAppDispatch();
  const { page } = useAppSelector((state) => state.pagination);
  const [mode, setMode] = useState(true);
  const [pokemonsType, setPokemonsType] = useState("");
  const typeFromRoute = useParams();

  const { data, isLoading } = useGetPokemonsQuery(page);

  const { data: typedPokemons } = useGetTypedPokemonsQuery(pokemonsType, {
    skip: pokemonsType.length === 0,
  });

  useEffect(() => {
    if (typeFromRoute.type) {
      setPokemonsType(typeFromRoute.type);
      setMode(false);
    }
  }, [typeFromRoute.type]);

  const onPokemonTypeFilter = (type: string) => {
    setPokemonsType(type);
    setMode(false);
  };
  const onNextHandler = () => {
    if (!mode) return;
    dispatch(setOffset());
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  let typedPokemonsContent: ReactElement = <></>;

  if (typedPokemons && Array.isArray(typedPokemons?.pokemon)) {
    typedPokemonsContent = (
      <>
        {typedPokemons.pokemon.length > 0 &&
          typedPokemons.pokemon.map(({ pokemon }: { pokemon: Pokemon }) => {
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
      </>
    );
  }
  if (data && Array.isArray(data?.results)) {
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
            <InfiniteScroll
              dataLength={data.results.length}
              next={onNextHandler}
              hasMore={data.count !== data.results.length}
              loader={mode && <p>Loading...</p>}
              scrollableTarget="scrollableDiv"
            >
              {typedPokemonsContent}
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
  }
};
export default PokemonList;
