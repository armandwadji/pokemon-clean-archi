import { useContext, useEffect, useState } from "react";
import { Pokemon } from "@pokemon/domain";
import { PokemonsPresenterVM } from "@pokemon/web-adapters";
import {
  AppDataProviderContext,
  appDataProviderContextType,
} from "../context/AppDataProviderContext";

const usePokemons = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const { getPokemonsController } = useContext(
    AppDataProviderContext,
  ) as appDataProviderContextType;

  useEffect(() => {
    getPokemonsController
      .getPokemons()
      .then((pokemonPresenterVM: PokemonsPresenterVM) =>
        setPokemons(pokemonPresenterVM?.pokemons ?? []),
      );
  }, [getPokemonsController]);

  return pokemons;
};

export default usePokemons;
