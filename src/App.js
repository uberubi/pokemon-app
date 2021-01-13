import "./App.css";
import PokemonList from "./components/PokemonList/PokemonList";
import PokemonInfo from "./components/PokemonInfo/PokemonInfo";
import Navbar from "./components/Navbar/Navbar";
import { Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <Navbar />
      <div className="app-content">
        <Route exact path="/" component={PokemonList} />
        <Route exact path="/pokemon/:name" component={PokemonInfo} />
      </div>
    </>
  );
};

export default App;
