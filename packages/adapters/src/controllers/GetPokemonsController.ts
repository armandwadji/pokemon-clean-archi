import {PokemonsPresenterVM} from "../presenters/PokemonsPresenter";
import {GetPokemonsUseCase} from "@pokemon/domain/src/usecases/getPokemons/getPokemonsUseCase";
import {Pokemon} from "@pokemon/domain";

export class GetPokemonsController {
    private getPokemonUseCase: GetPokemonsUseCase;
    private readonly pokemonsPresenterVM: PokemonsPresenterVM;

    constructor(getPokemonUseCase: GetPokemonsUseCase) {
        this.getPokemonUseCase = getPokemonUseCase;
        this.pokemonsPresenterVM = new PokemonsPresenterVM();
    }

    async getPokemons(): Promise<PokemonsPresenterVM> {
        const pokemons: Pokemon[] = await this.getPokemonUseCase.execute();
        this.pokemonsPresenterVM.pokemons = pokemons;
        this.pokemonsPresenterVM.pokemonTypes = this.getPokemonTypeList(pokemons);

        return Promise.resolve(this.pokemonsPresenterVM)
    }

    async searchPokemonsByName(search: string): Promise<PokemonsPresenterVM> {
        this.pokemonsPresenterVM.pokemonsSearch = this.searchPokemon(search);
        return this.pokemonsPresenterVM;
    }

    private getPokemonTypeList(pokemons: Pokemon[]): string[] {
        let allCategories: string[] = [];
        pokemons.forEach((pokemon: Pokemon) => pokemon.types.forEach((type) => allCategories = [...allCategories, type]));
        return Array.from(new Set(allCategories));
    }

    private searchPokemon(search: string): Pokemon[] | undefined {
        if (search.length <= 1) {
            return undefined;
        }

        return this.pokemonsPresenterVM?.pokemons?.filter((pokemon: Pokemon) =>
            pokemon.name.toLowerCase().includes(search.toLowerCase()),
        )

    }

}