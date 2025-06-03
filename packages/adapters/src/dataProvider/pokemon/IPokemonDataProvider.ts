import {IPokemonDataProviderBoundary, Pokemon, PokemonRequest} from "@pokemon/domain";
import {IDataprovider} from "../IDataprovider";

export interface IPokemonDataProvider extends IDataprovider{
    getPokemons(): Promise<Pokemon[]>

    getPokemon(pokemon: string): Promise<Pokemon>

    addPokemon(pokemon: PokemonRequest): Promise<Pokemon>

    updatePokemon(id: string, pokemon: PokemonRequest): Promise<Pokemon>

    deletePokemon(pokemon: string): Promise<void>;

    searchPokemonByName(search: string): Promise<Pokemon[] | undefined>;
}

/**
 * Decorator permettant d'enregistrer les instances de IPokemonDataProvider
 * @param ctor
 */
export function RegisterPokemonDataProvider<T extends { new(...args: any[]): IPokemonDataProviderBoundary }>(ctor: T) {
    PokemonDataProviderRegistry.register(ctor);
    return ctor;
}

/**
 * Class permettant d'enregistrer et de récupérer les implémentations de IPokemonDataProvider
 */
export class PokemonDataProviderRegistry {
    private static implementations: any[] = [];

    static register(ctor: any) {
        this.implementations.push(ctor);
    }

    static getImplementations() {
        return this.implementations;
    }
}