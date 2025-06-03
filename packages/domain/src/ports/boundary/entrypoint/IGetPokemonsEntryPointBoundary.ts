import {InputValues, IUseCase, OutputValues} from "../../../usecases/IUseCase";
import {Pokemon} from "@pokemon/domain";

export interface IGetPokemonsEntryPointBoundary extends IUseCase<InputGetPokemonsValues, OutputGetPokemonsValues>{
    execute(input: InputGetPokemonsValues) : Promise<OutputGetPokemonsValues>;
}

export interface InputGetPokemonsValues extends InputValues {
}

export interface OutputGetPokemonsValues extends OutputValues {
    pokemons: Pokemon[];
}
