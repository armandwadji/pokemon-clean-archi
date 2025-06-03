import {IPokemonDataProviderBoundary} from "../../ports/dataprovider/IPokemonDataProviderBoundary";
import {NewPokemonFields} from "../../ports/presenters/AddPokemonPresenter";
import {Pokemon} from "../../entities/Pokemon";
import {AbstractAddEditUseCase} from "../AbstractAddEditUseCase";
import {
    IAddPokemonEntryPointBoundary,
    InputAddPokemonValues,
    OutputAddPokemonValues
} from "../../ports/boundary/IAddPokemonEntryPointBoundary";
import {Builder} from "builder-pattern";
import {PokemonRequest} from "../../ports/request/PokemonRequest";


export class AddPokemonUseCase extends AbstractAddEditUseCase<InputAddPokemonValues, OutputAddPokemonValues> implements IAddPokemonEntryPointBoundary{

    constructor(private readonly pokemonDataProvider: IPokemonDataProviderBoundary) {
        super();
    }

    override async execute(inputAddPokemonValues: InputAddPokemonValues) : Promise<OutputAddPokemonValues> {
        const errors: Map<NewPokemonFields, string> = await this.validate(inputAddPokemonValues.pokemonRequest);

        if (!errors.size) {
            const pokemon = {
                hp: inputAddPokemonValues.pokemonRequest.hp,
                cp: inputAddPokemonValues.pokemonRequest.cp,
                name: inputAddPokemonValues.pokemonRequest.name,
                picture: inputAddPokemonValues.pokemonRequest.picture,
                types: inputAddPokemonValues.pokemonRequest.types || ['Normal'],
                created: inputAddPokemonValues.pokemonRequest.created || new Date(),
            } as PokemonRequest;

            const addedPokemon: Pokemon = await this.pokemonDataProvider.addPokemon(pokemon);
            return Promise.resolve(Builder<OutputAddPokemonValues>().pokemon(addedPokemon).build());
        }
        return Promise.reject(errors);
    }

}