import {IPokemonDataProviderBoundary} from "../../ports/dataprovider/IPokemonDataProviderBoundary";
import {UseCase} from "../UseCase";
import {
    IGetPokemonEntryPointBoundary,
    InputGetPokemonValues,
    OutputGetPokemonValues
} from "../../ports/boundary/IGetPokemonEntryPointBoundary";
import {Pokemon} from "../../entities/Pokemon";
import {Builder} from "builder-pattern";

export class GetPokemonUseCase extends UseCase<InputGetPokemonValues, OutputGetPokemonValues> implements IGetPokemonEntryPointBoundary{
    constructor(private pokemonRepository: IPokemonDataProviderBoundary) {
        super()
    }

    override async execute(inputPokemonValues: InputGetPokemonValues): Promise<OutputGetPokemonValues> {
        return this.pokemonRepository.getPokemon(inputPokemonValues.pokemonId)
            .then((pokemon: Pokemon)=> Builder<OutputGetPokemonValues>().pokemon(pokemon).build());
    }
}