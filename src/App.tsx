import cls from "./App.module.scss";
import PokemonList from "./components/PokemonList/PokemonList";

function App() {
  return (
    <>
      <div className={cls.container}>
        <PokemonList />
      </div>
    </>
  );
}

export default App;
