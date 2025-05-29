import {PokemonRepository} from "@pokemon/domain";

export class DeletePokemonUseCase{
    private pokemonRepository: PokemonRepository;

    constructor(pokemonRepository: PokemonRepository) {
        this.pokemonRepository = pokemonRepository;
    }

    async execute(id: string): Promise<void> {
        await this.pokemonRepository.deletePokemon(id);
    }
}