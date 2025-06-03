import {DeletePokemonUseCase} from "@pokemon/domain";
import {InputDeletePokemonValues} from "@pokemon/domain/src/ports/boundary/IDeletePokemonEntryPointBoundary";
import {Builder} from "builder-pattern";

export class DeletePokemonController{

    constructor(private readonly deletePokemonUseCase : DeletePokemonUseCase) {}

    async delete(id: string): Promise<void> {
        return new Promise( async (resolve, reject) =>{
            try {
                await this.deletePokemonUseCase.execute(Builder<InputDeletePokemonValues>().pokemonId(id).build());
                return resolve();
            } catch (error) {
                return reject(error)
            }
        } )
    }
}