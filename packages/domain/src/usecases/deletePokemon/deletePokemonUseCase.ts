import {IPokemonDataProviderBoundary} from "@pokemon/domain";
import {UseCase} from "../UseCase";
import {
    IDeletePokemonEntryPointBoundary,
    InputDeletePokemonValues,
    OutputDeletePokemonValues
} from "../../ports/boundary/IDeletePokemonEntryPointBoundary";
import {Builder} from "builder-pattern";

export class DeletePokemonUseCase extends UseCase<InputDeletePokemonValues, OutputDeletePokemonValues> implements IDeletePokemonEntryPointBoundary{

    constructor(private readonly pokemonRepository: IPokemonDataProviderBoundary) {
        super();
    }

    override async execute(inputDeletePokemonValues: InputDeletePokemonValues): Promise<OutputDeletePokemonValues> {
        return new Promise(async (resolve, reject)=> {
            try {
                await this.pokemonRepository.deletePokemon(inputDeletePokemonValues.pokemonId);
                return resolve(Builder<OutputDeletePokemonValues>().build());
            } catch (error) {
                return reject(error)
            }
        })
    }
}