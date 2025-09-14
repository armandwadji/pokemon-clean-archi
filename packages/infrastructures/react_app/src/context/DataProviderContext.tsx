import React, {
  Context,
  createContext,
  useEffect,
  useMemo,
  useState,
} from "react";
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
import { Config } from "../shared/model/config.model";
import { TranslateService } from "../shared/service/translate/translate.service";

export interface dataProviderContextType {
  getPokemonsController: GetPokemonsController;
  getPokemonController: GetPokemonController;
  updatePokemonController: EditPokemonController;
  addPokemonController: AddedPokemonController;
  deletePokemonController: DeletePokemonController;
  config: Config;
  translateService: TranslateService;
}

interface dataProviderContextProps {
  children: React.ReactNode;
}

const DataProviderContext: Context<dataProviderContextType | null> =
  createContext<dataProviderContextType | null>(null);

const DataProvider = ({ children }: dataProviderContextProps) => {
  const [config, setConfig] = useState<Config>(new Config({}));
  const [translateService, setTranslateService] = useState<TranslateService>(
    new TranslateService({} as typeof import("../../public/i18n/fr.json")),
  );

  useEffect(() => {
    const userLang: string = navigator.language.split("-")[0];

    Promise.all([
      fetch(`${process.env.PUBLIC_URL}/config/config.json`).then(
        (response: Response) => response.json(),
      ),
      fetch(`${process.env.PUBLIC_URL}/i18n/${userLang}.json`).then(
        (response: Response) => response.json(),
      ),
    ]).then(([configResponse, translateresponse]: any[]) => {
      setConfig(new Config(configResponse));
      setTranslateService(
        new TranslateService(
          translateresponse as typeof import("../../public/i18n/fr.json"),
        ),
      );
    });
  }, []);

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
    <DataProviderContext.Provider
      value={{
        getPokemonsController,
        getPokemonController,
        updatePokemonController,
        addPokemonController,
        deletePokemonController,
        config,
        translateService,
      }}
    >
      {children}
    </DataProviderContext.Provider>
  );
};

export { DataProviderContext, DataProvider };
