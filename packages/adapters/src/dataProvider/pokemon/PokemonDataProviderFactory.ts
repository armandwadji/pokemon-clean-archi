import {DataProviderFactory} from "../DataProviderFactory";
import {IPokemonDataProvider, PokemonDataProviderRegistry} from "./IPokemonDataProvider";
import {IPokemonDataProviderBoundary, Pokemon, PokemonRequest} from "@pokemon/domain";

export class PokemonDataProviderFactory extends DataProviderFactory<IPokemonDataProvider> implements IPokemonDataProviderBoundary {

    constructor(version: string) {
        super(PokemonDataProviderRegistry.getImplementations(), version);
    }

    getPokemons(): Promise<Pokemon[]> {
        return this.getCurrentDataProvider().getPokemons();
    }
    getPokemon(pokemon: string): Promise<Pokemon> {
        return this.getCurrentDataProvider().getPokemon(pokemon);
    }
    addPokemon(pokemon: PokemonRequest): Promise<Pokemon> {
        return this.getCurrentDataProvider().addPokemon(pokemon);
    }
    updatePokemon(id: string, pokemon: PokemonRequest): Promise<Pokemon> {
        return this.getCurrentDataProvider().updatePokemon(id, pokemon);
    }
    deletePokemon(pokemon: string): Promise<void> {
        return this.getCurrentDataProvider().deletePokemon(pokemon);
    }
    searchPokemonByName(search: string): Promise<Pokemon[] | undefined> {
        return this.getCurrentDataProvider().searchPokemonByName(search);
    }
}