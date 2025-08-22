import {Builder, StrictBuilder} from "builder-pattern";
import {GetPokemonUseCase, IPokemonDataProviderBoundary, Pokemon} from "@pokemon/domain";
import {
    InputGetPokemonValues,
    OutputGetPokemonValues
} from "../../ports/boundary/entrypoint/IGetPokemonEntryPointBoundary";

describe("Get Pokemon Use Case", () => {

    const StubPokemonBuilder = () => {
        return StrictBuilder<Pokemon>()
            .id("1")
            .hp(100)
            .cp(10)
            .name("Pikachu")
            .picture("https://assets.pokemon.com/assets/cms2/img/pokedex/detail/025.png")
            .types(["Electric"])
            .created(new Date("2023-01-01T00:00:00Z"))
    }

    it("display a pokemon", async () => {
        // Given
        const pokemonRepository: IPokemonDataProviderBoundary = Builder<IPokemonDataProviderBoundary>().getPokemon(() => Promise.resolve(
            StubPokemonBuilder().build()
        )).build();
        const inputPokemonValues: InputGetPokemonValues = Builder<InputGetPokemonValues>().pokemonId("1").build();
        const useCase: GetPokemonUseCase = new GetPokemonUseCase(pokemonRepository);

        // When
        useCase.execute(inputPokemonValues).then((outputGetPokemonValues: OutputGetPokemonValues) => {
            // Then
            expect(outputGetPokemonValues.pokemon).toEqual(expect.objectContaining({name: "Pikachu"}));
        });
    });

    it("throws an error when repository fails to fetch pokemons", async () => {
        const error = new Error("Repository error");
        const pokemonRepository: IPokemonDataProviderBoundary = Builder<IPokemonDataProviderBoundary>().getPokemon(() => Promise.reject(error)).build();
        const useCase: GetPokemonUseCase = new GetPokemonUseCase(pokemonRepository);
        const inputPokemonValues: InputGetPokemonValues = Builder<InputGetPokemonValues>().pokemonId("1").build();

        await expect(useCase.execute(inputPokemonValues)).rejects.toThrow("Repository error");
    });
})