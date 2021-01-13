import { useState, useEffect, useCallback, useRef } from "react";
import Loader from "../Loader/Loader";
import PokemonCard from "./PokemonCard/PokemonCard";
import "./PokemonList.css";

const PokemonList = () => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    fetch("https://pokeapi.co/api/v2/pokemon/")
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setPokemons(res);
        setLoading(false);
      });
  }, []);

  const observer = useRef();
  const lastPokemonRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && pokemons.next !== null) {
          setLoading(true);
          fetch(pokemons.next)
            .then((res) => res.json())
            .then((res) => {
              setPokemons({ ...res, results: [...pokemons.results, ...res.results] });
              setLoading(false);
            });
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, pokemons]
  );

  return (
    <div className="pokemon-list-wrapper">
      <div className="pokemon-list__buttons">
      </div>
      <div className="pokemon-list__pokemons">
        {pokemons.results &&
          pokemons.results.map((pokemon, index) => {
            if (pokemons.results.length === index + 1) {
              return (
                <PokemonCard
                  pokemonRef={lastPokemonRef}
                  key={pokemon.name}
                  url={pokemon.url}
                />
              );
            } else {
              return <PokemonCard key={pokemon.name} url={pokemon.url} />;
            }
          })}
      </div>
      {loading && <Loader />}
    </div>
  );
};

export default PokemonList;
