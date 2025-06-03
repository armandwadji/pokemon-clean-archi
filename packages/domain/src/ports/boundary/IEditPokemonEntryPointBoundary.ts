import {InputValues, IUseCase, OutputValues} from "../../usecases/IUseCase";
import {Pokemon, PokemonRequest} from "@pokemon/domain";

export interface IEditPokemonEntryPointBoundary extends IUseCase<InputEditPokemonValues, OutputEditPokemonValues>{
    execute(input: InputEditPokemonValues) : Promise<OutputEditPokemonValues>;
}

export interface InputEditPokemonValues extends InputValues {
    pokemonId: string;
    pokemonRequest: PokemonRequest;
}

export interface OutputEditPokemonValues extends OutputValues {
    pokemon: Pokemon;
}