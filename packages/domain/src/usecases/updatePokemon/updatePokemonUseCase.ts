import {AbstractAddEditUseCase} from "../AbstractAddEditUseCase";
import {NewPokemonFields, Pokemon, PokemonRepository, PokemonRequest} from "@pokemon/domain";

export class UpdatePokemonUseCase extends AbstractAddEditUseCase{
    private pokemonRepository: PokemonRepository;

    constructor(pokemonRepository: PokemonRepository) {
        super();
        this.pokemonRepository = pokemonRepository;
    }

    async execute(id: string, pokemonRequest: PokemonRequest): Promise<Pokemon> {
        const errors: Map<NewPokemonFields, string> = await this.validate(pokemonRequest);

        if (!errors.size) {
            const pokemon = {
                hp: pokemonRequest.hp,
                cp: pokemonRequest.cp,
                name: pokemonRequest.name,
                picture: pokemonRequest.picture,
                types: pokemonRequest.types,
                created: pokemonRequest.created || new Date(),
            } as Pokemon;

            const editPokemon: Pokemon = await this.pokemonRepository.updatePokemon(id, pokemon);
            return Promise.resolve(editPokemon);
        }
        return Promise.reject(errors);
    }

}