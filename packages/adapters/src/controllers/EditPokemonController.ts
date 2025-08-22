import {AbstractAddEditController} from "./AbstractAddEditController";
import {Pokemon, PokemonFields, PokemonRequest, UpdatePokemonUseCase} from "@pokemon/domain";
import {Builder} from "builder-pattern";
import {
    InputEditPokemonValues,
    OutputEditPokemonValues
} from "domain/src/ports/boundary/entrypoint/IEditPokemonEntryPointBoundary";

export class EditPokemonController extends AbstractAddEditController{
    private editPokemonUseCase: UpdatePokemonUseCase;

    constructor(editPokemonUseCase: UpdatePokemonUseCase) {
        super();
        this.editPokemonUseCase = editPokemonUseCase;
    }

    async update(id: string, pokemonRequest: PokemonRequest): Promise<Pokemon> {
        return this.editPokemonUseCase.execute(Builder<InputEditPokemonValues>().pokemonId(id).pokemonRequest(pokemonRequest).build())
            .then((output  : OutputEditPokemonValues) => output.pokemon);
    }

    override validate(): Promise<Map<PokemonFields, string>> {
        return this.editPokemonUseCase.validate(new PokemonRequest(this.pokemonPresenter.hp, this.pokemonPresenter.cp, this.pokemonPresenter.name, this.pokemonPresenter.picture));
    }

}