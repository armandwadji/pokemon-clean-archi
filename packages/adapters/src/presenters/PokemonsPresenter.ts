import {Pokemon} from "@pokemon/domain/src/entities/Pokemon";

export class PokemonsPresenterVM {
    pokemons: Pokemon[] | undefined = [];
    pokemonTypes: string[] | undefined = [];
    pokemonsSearch: Pokemon[] | undefined = undefined;
}