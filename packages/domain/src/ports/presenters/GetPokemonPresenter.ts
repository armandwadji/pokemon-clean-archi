import {Pokemon} from "../../entities/Pokemon";

export interface GetPokemonPresenter{
    displayPokemon(pokemon: Pokemon): void;
}