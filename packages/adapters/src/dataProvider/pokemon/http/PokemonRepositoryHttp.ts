import {Pokemon} from "@pokemon/domain/src/entities/Pokemon";
import {IPokemonDataProviderBoundary, PokemonRequest} from "@pokemon/domain";
import {DataProvider} from "../../DataProvider";
import {DataProviderCode, Version} from "../../IDataprovider";
import {RegisterPokemonDataProvider} from "../IPokemonDataProvider";

@RegisterPokemonDataProvider
export class PokemonRepositoryHttp extends DataProvider implements IPokemonDataProviderBoundary {

    private BASE_URL = `http://localhost:8000/pokemons`;

    constructor() {
        super(Version.V2, DataProviderCode.AUTH);
    }

    async getPokemons(): Promise<Pokemon[]> {
        return await fetch(`${this.BASE_URL}`,{method: HTTP_METHODS.GET, headers: {'Content-Type': 'application/json'}})
            .then((response: Response) => response.json())
            .catch((error: Error) => error)
    }

    async getPokemon(pokemonId: string): Promise<Pokemon> {
        return await fetch(`${this.BASE_URL}/${pokemonId}`, {method: HTTP_METHODS.GET, headers: {'Content-Type': 'application/json'}})
            .then((response: Response) => response.json())
            .catch((error: Error) => error)
    }

    async addPokemon(pokemonRequest: PokemonRequest): Promise<Pokemon> {
        return await fetch(`${this.BASE_URL}`, {
            method: HTTP_METHODS.POST,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...pokemonRequest,
                created: new Date()
            })
        })
            .then((response: Response) => response.json())
            .catch((error: Error) => error);
    }

    async updatePokemon(id: string, pokemonRequest: PokemonRequest): Promise<Pokemon> {
        return await fetch(`${this.BASE_URL}/${id}`, {
            method: HTTP_METHODS.PUT,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pokemonRequest)
        }).then((response: Response) => response.json())
            .catch((error: Error) => error);
    }

    async deletePokemon(pokemon: string): Promise<void> {
        return await fetch(`${this.BASE_URL}/${pokemon}`, {
            method: HTTP_METHODS.DELETE,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .catch((error: Error) => error);
    }

    async searchPokemonByName(search: string): Promise<Pokemon[] | undefined> {
        return await fetch(`${this.BASE_URL}?name_like=${search.trim()}`,
            {method: HTTP_METHODS.GET, headers: {'Content-Type': 'application/json'}})
            .then(response => response.json())
            .catch((error: Error) => error)
    }

}

enum HTTP_METHODS {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE'
}