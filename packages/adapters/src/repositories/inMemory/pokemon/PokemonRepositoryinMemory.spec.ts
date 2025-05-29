import {Pokemon} from "@pokemon/domain/src/entities/Pokemon";
import {Builder} from "builder-pattern";
import {PokemonRepositoryInMemory} from "@pokemon/web-adapters";
import {PokemonRequest} from "@pokemon/domain";


describe('PokemonRepositoryInMemory', () => {
    const stubPokemons: Pokemon[] = [
        Builder<Pokemon>().name("Pikachu").id("1").build(),
        Builder<Pokemon>().name("Carapuce").id("2").build(),
    ]

    test("get pokemons", async () => {
        // Given
        const pokemonRepository = new PokemonRepositoryInMemory(stubPokemons);

        // When
        const pokemonsResponse: Pokemon[] = await pokemonRepository.getPokemons();

        // Then
        expect(pokemonsResponse).toEqual(stubPokemons);
    });

    test("get pokemon by id", async () => {
        // Given
        const pokemonRepository = new PokemonRepositoryInMemory(stubPokemons);

        // When
        const pokemonResponse: Pokemon = await pokemonRepository.getPokemon("1");

        // Then
        expect(pokemonResponse).toEqual(stubPokemons[0]);
    });

    test("throw error when pokemon doesn't exist", () => {
        // Given
        const pokemonRepository = new PokemonRepositoryInMemory(stubPokemons);

        // When
        const request = () => pokemonRepository.getPokemon("999");

        // Then
        expect(request).toThrowError("999 doesn't exist in this repository");
    });

    test("add new pokemon", async () => {
        // Given
        const pokemonRepository = new PokemonRepositoryInMemory(stubPokemons);
        const newPokemon: PokemonRequest = Builder<PokemonRequest>().name("Bulbizarre").build();

        // When
        const addedPokemon: Pokemon = await pokemonRepository.addPokemon(newPokemon);

        // Then
        expect(addedPokemon.name).toEqual(newPokemon.name);
        const pokemonsResponse: Pokemon[] = await pokemonRepository.getPokemons();
        expect(pokemonsResponse).toContainEqual(addedPokemon);
    });

    test("delete pokemon", async () => {
        // Given
        const pokemonRepository = new PokemonRepositoryInMemory(stubPokemons);
        const pokemonToDelete: Pokemon = stubPokemons[0];

        // When
        await pokemonRepository.deletePokemon(pokemonToDelete.id);
        const pokemonsAfterDeletion: Pokemon[] = await pokemonRepository.getPokemons();

        // Then
        expect(pokemonsAfterDeletion).not.toContainEqual(pokemonToDelete);
        expect(pokemonsAfterDeletion).toHaveLength(stubPokemons.length - 1);
    });
});