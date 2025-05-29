import {PokemonRepository} from "@pokemon/domain/src/ports/repositories/PokemonRepository";
import {Pokemon} from "@pokemon/domain/src/entities/Pokemon";
import {HttpClient} from "../HttpClient";
import {PokemonRequest} from "@pokemon/domain";

export class PokemonRepositoryHttp implements PokemonRepository{

    private http: HttpClient;
    private BASE_URL = `http://localhost:8000/pokemons`;

    constructor(http: HttpClient) {
        this.http = http;
    }

    getPokemons(): Promise<Pokemon[]> {
        return this.http.get<Pokemon[]>(`${this.BASE_URL}`);
    }

    getPokemon(pokemonId: string): Promise<Pokemon> {
        return this.http.get<Pokemon>(`${this.BASE_URL}/${pokemonId}`);
    }

    addPokemon(pokemonRequest: PokemonRequest): Promise<Pokemon> {
        return this.http.post<Pokemon>( `${this.BASE_URL}`, pokemonRequest);
    }

    updatePokemon(id: string, pokemonRequest: PokemonRequest): Promise<Pokemon> {
        return this.http.put<Pokemon>(`${this.BASE_URL}/${id}`, pokemonRequest);
    }

    deletePokemon(pokemon: string): Promise<void> {
        return this.http.delete<void>(`${this.BASE_URL}/${pokemon}`);
    }

    searchPokemonByName(search: string): Promise<Pokemon[] | undefined> {
        return this.http.get<Pokemon[]>(`${this.BASE_URL}?name_like=${search.trim()}`);
    }

}