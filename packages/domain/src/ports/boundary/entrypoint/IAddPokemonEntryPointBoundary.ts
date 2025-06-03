import {InputValues, IUseCase, OutputValues} from "../../../usecases/IUseCase";
import {Pokemon, PokemonRequest} from "@pokemon/domain";

export interface IAddPokemonEntryPointBoundary extends IUseCase<InputAddPokemonValues, OutputAddPokemonValues>{
    execute(input: InputAddPokemonValues) : Promise<OutputAddPokemonValues>;
}

export interface InputAddPokemonValues extends InputValues {
    pokemonRequest: PokemonRequest;
}

export interface OutputAddPokemonValues extends OutputValues {
    pokemon: Pokemon;
}