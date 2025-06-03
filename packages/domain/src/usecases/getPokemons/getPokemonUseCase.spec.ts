import {Builder, StrictBuilder} from "builder-pattern";
import {GetPokemonsUseCase, IPokemonDataProviderBoundary, Pokemon,} from "@pokemon/domain";

describe("Get Pokemons Use Case", () => {

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

    test("display list of pokemons", async () => {
        // Given
         const pokemonRepository: IPokemonDataProviderBoundary = Builder<IPokemonDataProviderBoundary>().getPokemons(() => Promise.resolve([
            StubPokemonBuilder().name("Pikachu").build(),
            StubPokemonBuilder().name("Carapuce").build()
        ])).build();
        const useCase: GetPokemonsUseCase = new GetPokemonsUseCase(pokemonRepository);

            // When
        useCase.execute().then(pokemons => {
            // Then
            expect(pokemons).toHaveLength(2);
            expect(pokemons).toContainEqual(expect.objectContaining({name: "Pikachu"}));
            expect(pokemons).toContainEqual(expect.objectContaining({name: "Carapuce"}));
        });
    })
});