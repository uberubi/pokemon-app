import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./PokemonCard.css";

const PokemonCard = ({ url, pokemonRef }) => {
  const [pokemon, setPokemon] = useState(null);
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        setPokemon(res);
      });
  }, [url]);

  return (
    pokemon && (
      <Link to={`/pokemon/${pokemon.name}`} style={{ textDecoration: "none" }}>
        <div ref={pokemonRef} className="pokemon-card-wrapper">
          <p>{pokemon.name}</p>
          <img src={pokemon.sprites.front_default} alt="pokemon" />
        </div>
      </Link>
    )
  );
};

export default PokemonCard;
