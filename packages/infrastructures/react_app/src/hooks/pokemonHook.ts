import { useContext, useEffect, useState } from "react";
import {
  DataProviderContext,
  dataProviderContextType,
} from "../context/DataProviderContext";
import { PokemonPresenterVM } from "@pokemon/web-adapters";
import { Pokemon } from "@pokemon/domain";

const usePokemon = (id: string) => {
  const [pokemon, setPokemon] = useState<Pokemon | undefined>(undefined);
  const { getPokemonController } = useContext(
    DataProviderContext,
  ) as dataProviderContextType;

  useEffect(() => {
    getPokemonController
      .getPokemon(id)
      .then((pokemonPresenterVM: PokemonPresenterVM) =>
        setPokemon(pokemonPresenterVM.pokemon),
      );
  }, [id, getPokemonController]);

  return pokemon;
};

export default usePokemon;
