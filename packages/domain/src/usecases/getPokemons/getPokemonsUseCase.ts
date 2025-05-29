import {PokemonRepository} from "../../ports/repositories/PokemonRepository";
import {Pokemon} from "../../entities/Pokemon";

export class GetPokemonsUseCase {
    private pokemonRepository : PokemonRepository;

    constructor(pokemonRepository : PokemonRepository) {
        this.pokemonRepository = pokemonRepository;
    }

    async execute(): Promise<Pokemon[]>  {
        return this.pokemonRepository.getPokemons();
    }
}