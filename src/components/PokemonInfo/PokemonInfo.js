import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import pokemonNullImg from "../../assets/pokemon-null.svg";
import Loader from "../Loader/Loader";
import "./PokemonInfo.css";

const PokemonInfo = (props) => {
  const [pokemon, setPokemon] = useState();
  const [loading, setLoading] = useState(true);

  const history = useHistory();

  useEffect(() => {
    setLoading(true);
    fetch(`https://pokeapi.co/api/v2/pokemon/${props.match.params.name}`)
      .then((res) => res.json())
      .then((res) => {
        setPokemon(res);
        setLoading(false);
      });
  }, [props.match.params.name]);

  const handleGoBack = () => {
    history.goBack();
  };

  return (
    <div className="pokemon-info-wrapper">
      <button onClick={handleGoBack}> {"<"} Go Back</button>

      <div className="pokemon-info__card">
        {loading ? (
          <Loader />
        ) : (
          <>
            <h1>{pokemon.name}</h1>
            <img
              src={pokemon.sprites.front_default || pokemonNullImg}
              alt={pokemon.name}
            />
            <div className="pokemon-info__card-text">
              <p>
                Types:{" "}
                {pokemon.types.map((type) => (
                  <strong key={type.type.name}>{type.type.name + " "}</strong>
                ))}
              </p>
              <p>
                Weight:<strong>{pokemon.weight}</strong>{" "}
              </p>
              <p>
                Height: <strong>{pokemon.height}</strong>
              </p>
              <p>
                Base experience: <strong>{pokemon.base_experience}</strong>
              </p>
              <p>
                Abilities:
                {pokemon.abilities.map((ability) => (
                  <p>
                    <strong key={ability.ability.name}>
                      {ability.ability.name + " "}
                    </strong>
                  </p>
                ))}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PokemonInfo;
