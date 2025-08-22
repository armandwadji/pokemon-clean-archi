import React, {FunctionComponent} from "react";
import PokemonForm from "../components/pokemon-form";
import {PokemonRequest} from "@pokemon/domain";

const PokemonAdd: FunctionComponent = () => {

  const pokemon = new PokemonRequest();

  return (
    <div>
      <div className='row'>
        <h2 className='header center'>Ajouter un pokémon</h2>
        <PokemonForm pokemon={pokemon} id={undefined}></PokemonForm>
      </div>
    </div>
  );
};

export default PokemonAdd;
