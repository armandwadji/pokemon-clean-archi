import {IPokemonDataProviderBoundary} from "../../ports/boundary/dataprovider/IPokemonDataProviderBoundary";
import {PokemonFields} from "../../ports/presenters/AddPokemonPresenter";
import {Pokemon} from "../../entities/Pokemon";
import {
    IAddPokemonEntryPointBoundary,
    InputAddPokemonValues,
    OutputAddPokemonValues
} from "../../ports/boundary/entrypoint/IAddPokemonEntryPointBoundary";
import {Builder} from "builder-pattern";
import {PokemonRequest} from "@pokemon/domain";
import {AbstractAddEditUseCase} from "../AbstractAddEditUseCase";

export class AddPokemonUseCase extends AbstractAddEditUseCase<InputAddPokemonValues, OutputAddPokemonValues> implements IAddPokemonEntryPointBoundary{

    constructor(private readonly pokemonDataProvider: IPokemonDataProviderBoundary) {
        super();
    }

    override async execute(inputAddPokemonValues: InputAddPokemonValues) : Promise<OutputAddPokemonValues> {
        const errors: Map<PokemonFields, string> = await this.validate(inputAddPokemonValues.pokemonRequest);

        if (!errors.size) {
            const pokemon: PokemonRequest = Builder<PokemonRequest>()
                .hp(inputAddPokemonValues.pokemonRequest.hp)
                .cp(inputAddPokemonValues.pokemonRequest.cp)
                .name(inputAddPokemonValues.pokemonRequest.name)
                .picture(inputAddPokemonValues.pokemonRequest.picture)
                .types(inputAddPokemonValues.pokemonRequest.types)
                .created(new Date())
                .build();

            const addedPokemon: Pokemon = await this.pokemonDataProvider.addPokemon(pokemon);
            return Promise.resolve(Builder<OutputAddPokemonValues>().pokemon(addedPokemon).build());
        }
        return Promise.reject(errors);
    }

}