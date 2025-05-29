import {DeletePokemonUseCase} from "@pokemon/domain";

export class DeletePokemonController{
    private deletePokemonUseCase;

    constructor(deletePokemonUseCase : DeletePokemonUseCase) {
        this.deletePokemonUseCase = deletePokemonUseCase;
    }

    async delete(id: string): Promise<void> {
        try {
            await this.deletePokemonUseCase.execute(id);
        } catch (error) {
            throw error; // Re-throw the error for further handling if needed
        }
    }
}