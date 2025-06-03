import {PokemonsPresenterVM} from "../presenters/PokemonsPresenter";
import {GetPokemonsUseCase} from "@pokemon/domain/src/usecases/getPokemons/getPokemonsUseCase";
import {Pokemon} from "@pokemon/domain";
import {
    InputGetPokemonsValues,
    OutputGetPokemonsValues
} from "domain/src/ports/boundary/IGetPokemonsEntryPointBoundary";
import {Builder} from "builder-pattern";

export class GetPokemonsController {
    private readonly pokemonsPresenterVM: PokemonsPresenterVM;

    constructor(private readonly getPokemonUseCase: GetPokemonsUseCase) {
        this.pokemonsPresenterVM = Builder<PokemonsPresenterVM>().build();
    }

    async getPokemons(): Promise<PokemonsPresenterVM> {
        return this.getPokemonUseCase.execute(Builder<InputGetPokemonsValues>())
            .then((outputPokemonsValues: OutputGetPokemonsValues) => {
                this.pokemonsPresenterVM.pokemons = outputPokemonsValues.pokemons;
                this.pokemonsPresenterVM.pokemonTypes = this.getPokemonTypeList(outputPokemonsValues.pokemons)
                    return this.pokemonsPresenterVM
                }
            )
    }

    async searchPokemonsByName(search: string): Promise<PokemonsPresenterVM> {
        this.pokemonsPresenterVM.pokemonsSearch = this.searchPokemon(search);
        return this.pokemonsPresenterVM;
    }

    /**
     * Récupère la liste des types de pokemons
     * @param pokemons
     * @private
     */
    private getPokemonTypeList(pokemons: Pokemon[]): string[] {
        let allCategories: string[] = [];
        pokemons.forEach((pokemon: Pokemon) => pokemon.types.forEach((type) => allCategories = [...allCategories, type]));
        return Array.from(new Set(allCategories));
    }

    /**
     * Retourne la liste des pokémons correspondant à la recherche
     * @param search
     * @private
     */
    private searchPokemon(search: string): Pokemon[] | undefined {
        if (search.length <= 1) {
            return undefined;
        }

        return this.pokemonsPresenterVM?.pokemons?.filter((pokemon: Pokemon) =>
            pokemon.name.toLowerCase().includes(search.toLowerCase()),
        )

    }

}