import { useContext, useEffect, useState } from "react";
import {
  AppDataProviderContext,
  appDataProviderContextType,
} from "../context/AppDataProviderContext";
import { PokemonPresenterVM } from "@pokemon/web-adapters";
import { Pokemon } from "@pokemon/domain";

const usePokemon = (id: string) => {
  const [pokemon, setPokemon] = useState<Pokemon | undefined>(undefined);
  const { getPokemonController } = useContext(
    AppDataProviderContext,
  ) as appDataProviderContextType;

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
