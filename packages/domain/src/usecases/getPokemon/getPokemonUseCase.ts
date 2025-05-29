import {PokemonRepository} from "../../ports/repositories/PokemonRepository";
import {Pokemon} from "../../entities/Pokemon";

export class GetPokemonUseCase{
    constructor(private pokemonRepository: PokemonRepository) {}

    async execute(pokemonId: string): Promise<Pokemon> {
        return this.pokemonRepository.getPokemon(pokemonId)
    }
}