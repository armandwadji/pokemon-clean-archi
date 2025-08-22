import {DeletePokemonUseCase} from './deletePokemonUseCase';
import {Builder} from 'builder-pattern';
import {IPokemonDataProviderBoundary} from '@pokemon/domain';
import {OutputDeletePokemonValues} from "../../ports/boundary/entrypoint/IDeletePokemonEntryPointBoundary";

describe('DeletePokemonUseCase', () => {
    let useCase: DeletePokemonUseCase;
    let mockPokemonRepository: IPokemonDataProviderBoundary;

    beforeEach(() => {
        mockPokemonRepository = {
            deletePokemon: jest.fn()
        } as unknown as IPokemonDataProviderBoundary;
        useCase = new DeletePokemonUseCase(mockPokemonRepository);
    });

    it('deletes a Pokemon successfully when input is valid', async () => {
        const validInput = { pokemonId: '123' };
        mockPokemonRepository.deletePokemon = jest.fn().mockResolvedValue(undefined);

        const result = await useCase.execute(validInput);

        expect(mockPokemonRepository.deletePokemon).toHaveBeenCalledWith('123');
        expect(result).toEqual(Builder<OutputDeletePokemonValues>().build());
    });

    it('throws an error when deletePokemon fails', async () => {
        const invalidInput = { pokemonId: 'invalid-id' };
        const error = new Error('Delete failed');
        mockPokemonRepository.deletePokemon = jest.fn().mockRejectedValue(error);

        await expect(useCase.execute(invalidInput)).rejects.toThrow('Delete failed');
        expect(mockPokemonRepository.deletePokemon).toHaveBeenCalledWith('invalid-id');
    });
});