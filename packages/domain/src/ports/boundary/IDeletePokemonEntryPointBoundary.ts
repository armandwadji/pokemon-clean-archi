import {InputValues, IUseCase, OutputValues} from "../../usecases/IUseCase";

export interface IDeletePokemonEntryPointBoundary extends IUseCase<InputDeletePokemonValues, OutputDeletePokemonValues>{
    execute(input: InputDeletePokemonValues): Promise<OutputDeletePokemonValues>
}
export interface InputDeletePokemonValues extends InputValues {
    pokemonId: string;
}

export interface OutputDeletePokemonValues extends OutputValues {
}
