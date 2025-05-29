import {Pokemon} from "../../entities/Pokemon";

export interface GetPokemonsPresenter {
    displayPokemons(pokemons: Pokemon[]): void
}