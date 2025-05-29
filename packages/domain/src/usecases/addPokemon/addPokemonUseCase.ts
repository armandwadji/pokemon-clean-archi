import {PokemonRepository} from "../../ports/repositories/PokemonRepository";
import {PokemonRequest} from "../../ports/request/PokemonRequest";
import {NewPokemonFields} from "../../ports/presenters/AddPokemonPresenter";
import {Pokemon} from "../../entities/Pokemon";
import {AbstractAddEditUseCase} from "../AbstractAddEditUseCase";


export class AddPokemonUseCase extends AbstractAddEditUseCase{
    private pokemonRepository: PokemonRepository;

    constructor(pokemonRepository: PokemonRepository) {
        super();
        this.pokemonRepository = pokemonRepository;
    }

    async execute(pokemonRequest: PokemonRequest) : Promise<Pokemon> {
        const errors: Map<NewPokemonFields, string> = await this.validate(pokemonRequest);

        if (!errors.size) {
            const pokemon = {
                hp: pokemonRequest.hp,
                cp: pokemonRequest.cp,
                name: pokemonRequest.name,
                picture: pokemonRequest.picture,
                types: pokemonRequest.types || ['Normal'],
                created: pokemonRequest.created || new Date(),
            } as Pokemon;

            const addedPokemon: Pokemon = await this.pokemonRepository.addPokemon(pokemon);
            return Promise.resolve(addedPokemon);
        }
        return Promise.reject(errors);
    }

}