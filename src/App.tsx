import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import cls from "./App.module.scss";
import { PokemonCard } from "./components/PokemonCard";
import { useGetPokemonsQuery } from "./services/serivces";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { setOffset } from "./store/paginationSlice";

function App() {
  // const [typedPokemons, setTypedPokemons] = useState([]);
  // const [pokemonsType, setPokemonsType] = useState([]);

  // const [pokemonType, setPokemonType] = useState("");
  const dispatch = useAppDispatch();
  const { page } = useAppSelector((state) => state.pagination);

  const { data, isLoading } = useGetPokemonsQuery(page);

  // useEffect(() => {
  //   axios
  //     .get<AxiosResponse<PokemonType[]>>(`https://pokeapi.co/api/v2/type`)
  //     .then((res) => {
  //       setPokemonsType(res.data.results);
  //       console.log(res.data.results);
  //     });
  // }, []);

  // useEffect(() => {
  //   if (pokemonType) {
  //     axios.get(`https://pokeapi.co/api/v2/type/${pokemonType}`).then((res) => {
  //       setTypedPokemons(res.data.pokemon);
  //     });
  //   }
  // }, [pokemonType]);
  const onNextHandler = () => {
    dispatch(setOffset());
  };
  // const onHandleTypeChange = (e) => {
  //   setPokemonType(e.target.value.name);
  // };

  return (
    <>
      {isLoading && <p>Loadingddd...</p>}

      {data && (
        <div className={cls.container} id="scrollableDiv">
          {/* <Select defaultValue={{ name: "All" }} onChange={onHandleTypeChange}>
          {pokemonsType.map((pokemon) => (
            <MenuItem key={pokemon.name} value={pokemon}>
              {pokemon.name}
            </MenuItem>
          ))}
        </Select> */}
          <InfiniteScroll
            dataLength={data.results.length}
            hasMore={true}
            next={onNextHandler}
            loader={<p>Loading...</p>}
            scrollableTarget="scrollableDiv"
          >
            {!isLoading &&
              data?.results.map((pokemon) => (
                <Link
                  to={`/details/${pokemon.name}`}
                  preventScrollReset={true}
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

export default App;
