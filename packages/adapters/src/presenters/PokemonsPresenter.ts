import {Pokemon} from "@pokemon/domain/src/entities/Pokemon";

export interface PokemonsPresenterVM {
    pokemons: Pokemon[] | undefined ;
    pokemonTypes: string[] | undefined ;
    pokemonsSearch: Pokemon[] | undefined;
}