import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import pokeballImg from "../../assets/pokeball.png";
import "./Navbar.css";

const Navbar = () => {
  const [pokemonNamesList, setPokemonNamesList] = useState([]);
  const [searchPokemon, setSearchPokemon] = useState("");

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon/?limit=1118")
      .then((res) => {
        const pokemons = res.json();
        return pokemons;
      })
      .then((res) => {
        setPokemonNamesList(res.results);
      });
  }, []);

  const handleInputChange = (e) => {
    setSearchPokemon(e.target.value);
  };

  return (
    <div className="navbar-wrapper">
      <Link to="/">
        <h1>Home</h1>
      </Link>
      <input
        type="search"
        placeholder="find pokemon..."
        value={searchPokemon}
        onChange={handleInputChange}
      />
      {pokemonNamesList
        .filter((pokemon) => pokemon.name.includes(searchPokemon))
        .map((pokemon, i) => (
          <Link key={pokemon.name + i} to={`/pokemon/${pokemon.name}`}>
            <img src={pokeballImg} alt="pokeball" />
            <span>
              <p>{pokemon.name}</p>
            </span>
          </Link>
        ))}
    </div>
  );
};

export default Navbar;
