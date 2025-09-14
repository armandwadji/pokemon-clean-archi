import React, { Context, createContext, useContext, useMemo } from "react";
import {
  AddedPokemonController,
  DeletePokemonController,
  EditPokemonController,
  GetPokemonController,
  GetPokemonsController,
  PokemonDataProviderFactory,
} from "@pokemon/web-adapters";
import {
  AddPokemonUseCase,
  DeletePokemonUseCase,
  GetPokemonsUseCase,
  GetPokemonUseCase,
  UpdatePokemonUseCase,
} from "@pokemon/domain";
import { AppInitContext, appInitContextType } from "./AppInitContext";

export interface appDataProviderContextType {
  getPokemonsController: GetPokemonsController;
  getPokemonController: GetPokemonController;
  updatePokemonController: EditPokemonController;
  addPokemonController: AddedPokemonController;
  deletePokemonController: DeletePokemonController;
}

interface appDataProviderContextProps {
  children: React.ReactNode;
}

const AppDataProviderContext: Context<appDataProviderContextType | null> =
  createContext<appDataProviderContextType | null>(null);

const AppDataProvider = ({ children }: appDataProviderContextProps) => {
  const { config } = useContext(AppInitContext) as appInitContextType;

  /**
   * Data Provider Factory (can be V1 or V2, depending on the API version to use)
   * Here we use V1 as example
   */
  const pokemonDataProvider: PokemonDataProviderFactory = useMemo(
    () =>
      new PokemonDataProviderFactory(config.pokemonDataProviderVersion ?? "V1"),
    [config.pokemonDataProviderVersion],
  );

  /**
   * Use Cases and Controllers for getting Pokémons
   */
  const pokemonsUseCase: GetPokemonsUseCase = useMemo(
    () => new GetPokemonsUseCase(pokemonDataProvider),
    [pokemonDataProvider],
  );
  const getPokemonsController: GetPokemonsController = useMemo(
    () => new GetPokemonsController(pokemonsUseCase),
    [pokemonsUseCase],
  );

  /**
   * Use Cases and Controllers for getting a single Pokémon by id
   */
  const pokemonUseCase: GetPokemonUseCase = useMemo(
    () => new GetPokemonUseCase(pokemonDataProvider),
    [pokemonDataProvider],
  );
  const getPokemonController: GetPokemonController = useMemo(
    () => new GetPokemonController(pokemonUseCase),
    [pokemonUseCase],
  );

  /**
   * Use Cases and Controllers for updating a Pokémon
   */
  const updatePokemonUseCase: UpdatePokemonUseCase = useMemo(
    () => new UpdatePokemonUseCase(pokemonDataProvider),
    [pokemonDataProvider],
  );
  const updatePokemonController: EditPokemonController = useMemo(
    () => new EditPokemonController(updatePokemonUseCase),
    [updatePokemonUseCase],
  );

  /**
   * Use Cases and Controllers for adding a new Pokémon
   */
  const addPokemonUseCase: AddPokemonUseCase = useMemo(
    () => new AddPokemonUseCase(pokemonDataProvider),
    [pokemonDataProvider],
  );
  const addPokemonController: AddedPokemonController = useMemo(
    () => new AddedPokemonController(addPokemonUseCase),
    [addPokemonUseCase],
  );

  /**
   * Use Cases and Controllers for deleting a Pokémon
   */
  const deletePokemonUseCase: DeletePokemonUseCase = useMemo(
    () => new DeletePokemonUseCase(pokemonDataProvider),
    [pokemonDataProvider],
  );
  const deletePokemonController: DeletePokemonController = useMemo(
    () => new DeletePokemonController(deletePokemonUseCase),
    [deletePokemonUseCase],
  );

  return (
    <AppDataProviderContext.Provider
      value={{
        getPokemonsController,
        getPokemonController,
        updatePokemonController,
        addPokemonController,
        deletePokemonController,
      }}
    >
      {children}
    </AppDataProviderContext.Provider>
  );
};

export { AppDataProviderContext, AppDataProvider };
