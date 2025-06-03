import {PokemonPresenterVM} from "../presenters/PokemonPresenter";
import {GetPokemonUseCase} from "@pokemon/domain";
import {InputGetPokemonValues, OutputGetPokemonValues} from "domain/src/ports/boundary/IGetPokemonEntryPointBoundary";
import {Builder} from "builder-pattern";

export class GetPokemonController {

    constructor(private readonly getPokemonUseCase: GetPokemonUseCase) {}

     async getPokemon(pokemonId: string): Promise<PokemonPresenterVM> {
        return this.getPokemonUseCase.execute(Builder<InputGetPokemonValues>().pokemonId(pokemonId).build())
            .then((outputPokemonValues: OutputGetPokemonValues) => Builder<PokemonPresenterVM>().pokemon(outputPokemonValues.pokemon).build());
    }
    
}