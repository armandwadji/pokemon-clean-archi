import React, { FunctionComponent, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../components/loader";
import { formatType } from "../utils/formatType/formatType";
import { formatDate } from "../utils/formatDate/formatDate";
import usePokemon from "../hooks/pokemonHook";
import { Pokemon } from "@pokemon/domain";
import { routesName } from "../utils/routing.config";
import { AppInitContext, appInitContextType } from "../context/AppInitContext";

const PokemonsDetail: FunctionComponent = () => {
  const { id } = useParams();
  const pokemon: Pokemon | undefined = usePokemon(id ?? "");
  const { translateService } = useContext(AppInitContext) as appInitContextType;

  return (
    <div>
      {pokemon ? (
        <div className="row">
          <div className="col s12 m8 offset-m2">
            <h2 className="header center">{pokemon.name}</h2>
            <div className="card hoverable">
              <div className="card-image">
                <img
                  src={pokemon.picture}
                  alt={pokemon.name}
                  style={{ width: "250px", margin: "0 auto" }}
                />
                <Link
                  to={`/pokemons/edit/${pokemon.id}`}
                  className="btn btn-floating halfway-fab waves-effect waves-light"
                >
                  <i className="material-icons">edit</i>
                </Link>
              </div>
              <div className="card-stacked">
                <div className="card-content">
                  <table className="bordered striped">
                    <tbody>
                      <tr>
                        <td>
                          {translateService.translate("details.name") as string}
                        </td>
                        <td>
                          <strong>{pokemon.name}</strong>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          {translateService.translate("details.hp") as string}
                        </td>
                        <td>
                          <strong>{pokemon.hp}</strong>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          {translateService.translate("details.cp") as string}
                        </td>
                        <td>
                          <strong>{pokemon.cp}</strong>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          {translateService.translate("details.type") as string}
                        </td>
                        <td>
                          {pokemon.types.map((type: string) => (
                            <span key={type} className={formatType(type)}>
                              {type}
                            </span>
                          ))}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          {translateService.translate("details.date") as string}
                        </td>
                        <td>{formatDate(pokemon.created)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="card-action">
                  <Link
                    to={`/${routesName.pokemon.path}`}
                    className="btn btn-floating waves-effect waves-light"
                  >
                    <i className="material-icons">arrow_back</i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h4 className="center">
          <Loader />
        </h4>
      )}
    </div>
  );
};

export default PokemonsDetail;
