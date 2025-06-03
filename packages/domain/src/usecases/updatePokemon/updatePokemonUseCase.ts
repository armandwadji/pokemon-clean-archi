import {IPokemonDataProviderBoundary} from "../../ports/dataprovider/IPokemonDataProviderBoundary";
import {NewPokemonFields} from "../../ports/presenters/AddPokemonPresenter";
import {Pokemon} from "../../entities/Pokemon";
import {AbstractAddEditUseCase} from "../AbstractAddEditUseCase";
import {
    IEditPokemonEntryPointBoundary,
    InputEditPokemonValues,
    OutputEditPokemonValues
} from "../../ports/boundary/IEditPokemonEntryPointBoundary";
import {Builder} from "builder-pattern";
import {PokemonRequest} from "../../ports/request/PokemonRequest";

export class UpdatePokemonUseCase extends AbstractAddEditUseCase<InputEditPokemonValues, OutputEditPokemonValues> implements IEditPokemonEntryPointBoundary{

    constructor(private readonly pokemonDataProvider: IPokemonDataProviderBoundary) {
        super();
    }
    
    override async execute(inputEditPokemonValues: InputEditPokemonValues): Promise<OutputEditPokemonValues> {
        const errors: Map<NewPokemonFields, string> = await this.validate(inputEditPokemonValues.pokemonRequest);

        if (!errors.size) {
            const pokemon: PokemonRequest = Builder<PokemonRequest>()
                .hp(inputEditPokemonValues.pokemonRequest.hp)
                .cp(inputEditPokemonValues.pokemonRequest.cp)
                .name(inputEditPokemonValues.pokemonRequest.name)
                .picture(inputEditPokemonValues.pokemonRequest.picture)
                .types(inputEditPokemonValues.pokemonRequest.types)
                .created(inputEditPokemonValues.pokemonRequest.created)
                .build();

            const editPokemon: Pokemon = await this.pokemonDataProvider.updatePokemon(inputEditPokemonValues.pokemonId, pokemon);
            return Promise.resolve(Builder<OutputEditPokemonValues>().pokemon(editPokemon).build());
        }
        return Promise.reject(errors);
    }

}