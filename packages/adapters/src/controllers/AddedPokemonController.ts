import {AddPokemonUseCase, NewPokemonFields, Pokemon, PokemonRequest} from "@pokemon/domain";
import {AbstractAddEditController} from "./AbstractAddEditController";
import {Builder} from "builder-pattern";
import {
    InputAddPokemonValues,
    OutputAddPokemonValues
} from "domain/src/ports/boundary/entrypoint/IAddPokemonEntryPointBoundary";


export class AddedPokemonController extends AbstractAddEditController{

    constructor(private readonly addPokemonUseCase: AddPokemonUseCase) {
        super();
    }

    async create(pokemonRequest: PokemonRequest): Promise<Pokemon> {
        return this.addPokemonUseCase.execute(Builder<InputAddPokemonValues>().pokemonRequest(pokemonRequest).build())
            .then((outputAddPokemonValues : OutputAddPokemonValues) => outputAddPokemonValues.pokemon);
    }


    override validate(): Promise<Map<NewPokemonFields, string>> {
        return this.addPokemonUseCase.validate(new PokemonRequest(this.pokemonPresenter.hp, this.pokemonPresenter.cp, this.pokemonPresenter.name, this.pokemonPresenter.picture))
    }
}