import {Pokemon} from "@pokemon/domain/src/entities/Pokemon";
import {Builder} from "builder-pattern";
import {PokemonRepositoryInMemory} from "@pokemon/web-adapters";
import {PokemonRequest} from "@pokemon/domain";
import {POKEMONS} from "../../../../fixtures/mock-pokemon-list";


describe('PokemonRepositoryInMemory', () => {

    test("get pokemons", async () => {
        // Given
        const pokemonRepository = new PokemonRepositoryInMemory();

        // When
        const pokemonsResponse: Pokemon[] = await pokemonRepository.getPokemons();

        // Then
        expect(pokemonsResponse).toEqual(POKEMONS);
    });

    test("get pokemon by id", async () => {
        // Given
        const pokemonRepository = new PokemonRepositoryInMemory();

        // When
        const pokemonResponse: Pokemon = await pokemonRepository.getPokemon("1");

        // Then
        expect(pokemonResponse).toEqual(POKEMONS[0]);
    });

    test("throw error when pokemon doesn't exist", () => {
        // Given
        const pokemonRepository = new PokemonRepositoryInMemory();

        // When
         pokemonRepository.getPokemon("999").catch((error: Error) => {
            // Then
            expect(error.message).toEqual("pokemon by id 999 doesn't exist in this repository");
         });
    });

    test("add new pokemon", async () => {
        // Given
        const pokemonRepository = new PokemonRepositoryInMemory();
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
        const pokemonRepository = new PokemonRepositoryInMemory();
        const pokemonToDelete: Pokemon = POKEMONS[0];

        // When
        await pokemonRepository.deletePokemon(pokemonToDelete.id);
        const pokemonsAfterDeletion: Pokemon[] = await pokemonRepository.getPokemons();

        // Then
        expect(pokemonsAfterDeletion).not.toContainEqual(pokemonToDelete);
        expect(pokemonsAfterDeletion).toHaveLength(POKEMONS.length - 1);
    });
});