import { useContext, useEffect, useState } from "react";
import { Pokemon } from "@pokemon/domain";
import { PokemonsPresenterVM } from "@pokemon/web-adapters";
import {
  DataProviderContext,
  dataProviderContextType,
} from "../context/DataProviderContext";

const usePokemons = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const { getPokemonsController } = useContext(
    DataProviderContext,
  ) as dataProviderContextType;

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
