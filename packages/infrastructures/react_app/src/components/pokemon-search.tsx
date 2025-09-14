import { ChangeEvent, FunctionComponent, useContext, useState } from "react";

import { Link } from "react-router";
import { Pokemon } from "@pokemon/domain";
import {
  AppDataProviderContext,
  appDataProviderContextType,
} from "../context/AppDataProviderContext";
import { PokemonsPresenterVM } from "@pokemon/web-adapters";
import { routesName } from "../utils/routing.config";
import { AppInitContext, appInitContextType } from "../context/AppInitContext";

const PokemonSearch: FunctionComponent = () => {
  const [term, setTerm] = useState<string>("");
  const [pokemons, setPokemons] = useState<Pokemon[] | undefined>([]);
  const { getPokemonsController } = useContext(
    AppDataProviderContext,
  ) as appDataProviderContextType;
  const { translateService } = useContext(AppInitContext) as appInitContextType;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const term: string = e.target.value;
    setTerm(term);

    if (term.length <= 1) {
      setPokemons([]);
      return;
    }

    getPokemonsController
      .searchPokemonsByName(term)
      .then((pokemonsPresenterVM: PokemonsPresenterVM) => {
        setPokemons(
          pokemonsPresenterVM.pokemonsSearch?.length
            ? pokemonsPresenterVM.pokemonsSearch
            : undefined,
        );
      });
  };

  return (
    <div className="row">
      <div className="col s12 m6 offset-m3">
        <div className="card">
          <div className="card-content">
            <div className="input-field">
              <input
                type="text"
                placeholder={
                  translateService.translate("search.placeholder") as string
                }
                value={term}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div className="collection">
              {!pokemons ? (
                <p className="collection-item">
                  {translateService.translate("search.emptyResult") as string}
                </p>
              ) : (
                pokemons.map((pokemon) => (
                  <Link
                    key={pokemon.id}
                    to={`/${routesName.pokemon.children.detail.fullPath}/${pokemon.id}`}
                    className="collection-item"
                  >
                    {pokemon.name}
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonSearch;
