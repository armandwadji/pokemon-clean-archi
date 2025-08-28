import { ChangeEvent, FunctionComponent, useContext, useState } from "react";

import { Link } from "react-router";
import { Pokemon } from "@pokemon/domain";
import {
  DataProviderContext,
  dataProviderContextType,
} from "../context/DataProviderContext";
import { PokemonsPresenterVM } from "@pokemon/web-adapters";
import { routesName } from "../utils/routing.config";

const PokemonSearch: FunctionComponent = () => {
  const [term, setTerm] = useState<string>("");
  const [pokemons, setPokemons] = useState<Pokemon[] | undefined>([]);
  const { getPokemonsController } = useContext(
    DataProviderContext,
  ) as dataProviderContextType;

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
                placeholder="Rechercher un pokémon"
                value={term}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div className="collection">
              {!pokemons ? (
                <p className="collection-item">No result match</p>
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
