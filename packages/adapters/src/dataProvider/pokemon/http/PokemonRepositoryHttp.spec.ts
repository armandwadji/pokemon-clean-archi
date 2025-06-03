import {Pokemon} from "@pokemon/domain/src/entities/Pokemon";
import {Builder} from "builder-pattern";
import {HttpClient, PokemonRepositoryHttp} from "@pokemon/web-adapters";


describe("PokemonRepositoryHttp", () => {
    const stubPokemons: Pokemon[] = [
        Builder<Pokemon>().name("Pikachu").id("1").build(),
        Builder<Pokemon>().name("Carapuce").id("2").build(),
    ]

    test("should get pokemons", async () => {
        // Given
        const httpClient: HttpClient = {
            get(url: string): Promise<any> {
                expect(url).toBe(`http://localhost:8000/pokemons`)
                return Promise.resolve(stubPokemons)
            }
        } as HttpClient;

        jest.spyOn(PokemonRepositoryHttp.prototype, 'getPokemons').mockImplementation(() => {
            return httpClient.get(`http://localhost:8000/pokemons`);
        });

        const pokemonRepository = new PokemonRepositoryHttp();

        // When
        const pokemons: Pokemon[] = await pokemonRepository.getPokemons();

        // Then
        expect(pokemons).toEqual(stubPokemons);
    });

    test("should get pokemon by id", async () => {
        const pokemonFound: Pokemon = stubPokemons[0];
        // Given
        const httpClient: HttpClient = {
            get(url: string): Promise<any> {
                expect(url).toBe(`http://localhost:8000/pokemons/${pokemonFound.id}`)
                return Promise.resolve(stubPokemons[0])
            }
        } as HttpClient;

        jest.spyOn(PokemonRepositoryHttp.prototype, 'getPokemon').mockImplementation(() => {
            return httpClient.get(`http://localhost:8000/pokemons/${pokemonFound.id}`);
        });

        const pokemonRepository = new PokemonRepositoryHttp();

        // When
        const pokemon: Pokemon = await pokemonRepository.getPokemon(pokemonFound.id);

        // Then
        expect(pokemon).toEqual(pokemonFound);
    });

    test("should throw error when pokemon doesn't exist", () => {
        // Given
        const httpClient: HttpClient = {
            get(url: string): Promise<any> {
                expect(url).toBe(`http://localhost:8000/pokemons/999`)
                return Promise.reject(new Error("999 doesn't exist in this repository"))
            }
        } as HttpClient;

        jest.spyOn(PokemonRepositoryHttp.prototype, 'getPokemon').mockImplementation(() => {
            return httpClient.get(`http://localhost:8000/pokemons/999`);
        });

        const pokemonRepository = new PokemonRepositoryHttp();

        // When
        const request = () => pokemonRepository.getPokemon("999");

        // Then
        expect(request).rejects.toThrowError("999 doesn't exist in this repository");
    });

    test("should add new pokemon", async () => {
        // Given
        const newPokemon: Pokemon = Builder<Pokemon>().name("Bulbizarre").id("3").build();
        
        const httpClient: HttpClient = {
            post(url: string, body: any): Promise<any> {
                expect(url).toBe(`http://localhost:8000/pokemons`)
                expect(body).toEqual(newPokemon);
                return Promise.resolve(newPokemon);
            }
        } as HttpClient;

        jest.spyOn(PokemonRepositoryHttp.prototype, 'getPokemon').mockImplementation(() => {
            return httpClient.post(`http://localhost:8000/pokemons`, newPokemon);
        });

        const pokemonRepository = new PokemonRepositoryHttp();

        // When
        const addedPokemon: Pokemon = await pokemonRepository.addPokemon(newPokemon);

        // Then
        expect(addedPokemon).toEqual(newPokemon);
    });

    test("should delete pokemon", async () => {
        // Given
        const pokemonToDelete: Pokemon = stubPokemons[0];
        const httpClient: HttpClient = {
            delete(url: string): Promise<any> {
                expect(url).toBe(`http://localhost:8000/pokemons/${pokemonToDelete.id}`)
                return Promise.resolve();
            },
            get(url: string): Promise<any> {
                expect(url).toBe(`http://localhost:8000/pokemons`)
                return Promise.resolve(stubPokemons.filter(p => p.id !== pokemonToDelete.id));
            }
        } as HttpClient;

        const pokemonRepository = new PokemonRepositoryHttp();

        // When
        await pokemonRepository.deletePokemon(pokemonToDelete.id);
        const pokemonsAfterDeletion: Pokemon[] = await pokemonRepository.getPokemons();

            // Then
        expect(pokemonsAfterDeletion.length).toEqual(stubPokemons.length - 1);
        expect(pokemonsAfterDeletion).toEqual(stubPokemons.filter(p => p.id !== pokemonToDelete.id));
    });
});