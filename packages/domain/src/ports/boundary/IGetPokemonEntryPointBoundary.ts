import {InputValues, IUseCase, OutputValues} from "../../usecases/IUseCase";
import {Pokemon} from "@pokemon/domain";

export interface IGetPokemonEntryPointBoundary extends IUseCase<InputGetPokemonValues, OutputGetPokemonValues>{
    execute(input: InputGetPokemonValues): Promise<OutputGetPokemonValues>
}

export interface InputGetPokemonValues extends InputValues {
    pokemonId: string;
}

export interface OutputGetPokemonValues extends OutputValues {
    pokemon: Pokemon;
}