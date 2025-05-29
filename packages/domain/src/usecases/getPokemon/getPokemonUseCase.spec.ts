import {Builder, StrictBuilder} from "builder-pattern";
import {GetPokemonUseCase, Pokemon, PokemonRepository} from "@pokemon/domain";

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

    test("display a pokemon", async () => {
        // Given
        const pokemonRepository: PokemonRepository = Builder<PokemonRepository>().getPokemon(() => Promise.resolve(
            StubPokemonBuilder().build()
        )).build();
        const useCase: GetPokemonUseCase = new GetPokemonUseCase(pokemonRepository);

        // When
        useCase.execute("1").then(pokemon => {
            // Then
            expect(pokemon).toEqual(expect.objectContaining({name: "Pikachu"}));
        });
    });
})