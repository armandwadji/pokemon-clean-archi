import React, { FunctionComponent, useEffect, useState } from "react";
import PokemonForm from "../components/pokemon-form";
import { useParams } from "react-router";
import Loader from "../components/loader";
import usePokemon from "../hooks/pokemonHook";
import { Pokemon, PokemonRequest } from "@pokemon/domain";

const PokemonEdit: FunctionComponent = () => {
  const { id } = useParams();
  const pokemon: Pokemon | undefined = usePokemon(id ?? "");
  const [pokemonRequest, setPokemonRequest] = useState<
    PokemonRequest | undefined
  >(undefined);

  useEffect(() => {
    if (pokemon) {
      const { name, hp, cp, picture, types, created } = pokemon;
      setPokemonRequest(
        new PokemonRequest(hp, cp, name, picture, types, created),
      );
    }
  }, [pokemon]);

  return (
    <div>
      {pokemonRequest ? (
        <div className="row">
          <h2 className="header center">Éditer {pokemonRequest.name}</h2>
          <PokemonForm pokemon={pokemonRequest} id={String(id)}></PokemonForm>
        </div>
      ) : (
        <h4 className="center">
          <Loader />
        </h4>
      )}
    </div>
  );
};

export default PokemonEdit;
