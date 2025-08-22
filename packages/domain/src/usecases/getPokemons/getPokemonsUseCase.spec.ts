import {Builder} from "builder-pattern";
import {GetPokemonsUseCase, IPokemonDataProviderBoundary, Pokemon,} from "@pokemon/domain";
import {OutputGetPokemonsValues} from "../../ports/boundary/entrypoint/IGetPokemonsEntryPointBoundary";

describe("Get Pokemons Use Case", () => {

    it("returns an empty list when no pokemons are available", async () => {
        const pokemonRepository: IPokemonDataProviderBoundary = Builder<IPokemonDataProviderBoundary>().getPokemons(() => Promise.resolve([])).build();
        const useCase: GetPokemonsUseCase = new GetPokemonsUseCase(pokemonRepository);

        const outputGetPokemonsValues: OutputGetPokemonsValues = await useCase.execute();

        expect(outputGetPokemonsValues.pokemons).toHaveLength(0);
    });

    it("display list of pokemons", async () => {
        // Given
         const pokemonRepository: IPokemonDataProviderBoundary = Builder<IPokemonDataProviderBoundary>().getPokemons(() => Promise.resolve([
             Builder<Pokemon>().name("Pikachu").build(),
             Builder<Pokemon>().name("Carapuce").build()
        ])).build();
        const useCase: GetPokemonsUseCase = new GetPokemonsUseCase(pokemonRepository);

            // When
        useCase.execute().then((outputGetPokemonsValues: OutputGetPokemonsValues) => {
            // Then
            expect(outputGetPokemonsValues.pokemons).toHaveLength(2);
            expect(outputGetPokemonsValues.pokemons).toContainEqual(expect.objectContaining({name: "Pikachu"}));
            expect(outputGetPokemonsValues.pokemons).toContainEqual(expect.objectContaining({name: "Carapuce"}));
        });
    });

    it("throws an error when repository fails to fetch pokemons", async () => {
        const error = new Error("Repository error");
        const pokemonRepository: IPokemonDataProviderBoundary = Builder<IPokemonDataProviderBoundary>().getPokemons(() => Promise.reject(error)).build();
        const useCase: GetPokemonsUseCase = new GetPokemonsUseCase(pokemonRepository);

        await expect(useCase.execute()).rejects.toThrow("Repository error");
    });
});