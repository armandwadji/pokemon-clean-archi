import {Pokemon} from "../../../entities/Pokemon";
import {PokemonRequest} from "../../request/PokemonRequest";

export interface IPokemonDataProviderBoundary {
    getPokemons(): Promise<Pokemon[]>

    getPokemon(pokemon: string): Promise<Pokemon>

    addPokemon(pokemon: PokemonRequest): Promise<Pokemon>

    updatePokemon(id: string, pokemon: PokemonRequest): Promise<Pokemon>

    deletePokemon(pokemon: string): Promise<void>;

    searchPokemonByName(search: string): Promise<Pokemon[] | undefined>;
}