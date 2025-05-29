import {PokemonPresenterVM} from "../presenters/PokemonPresenter";
import {GetPokemonUseCase, Pokemon} from "@pokemon/domain";

export class GetPokemonController {
    private readonly getPokemonUseCase : GetPokemonUseCase;

    constructor(getPokemonUseCase: GetPokemonUseCase) {
        this.getPokemonUseCase = getPokemonUseCase;
    }

     async getPokemon(pokemonId: string): Promise<PokemonPresenterVM> {
        const pokemon : Pokemon = await this.getPokemonUseCase.execute(pokemonId);
        return{
            pokemon: pokemon,
        }
    }
    
}