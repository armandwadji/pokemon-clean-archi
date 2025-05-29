import {AbstractAddEditController} from "./AbstractAddEditController";
import {NewPokemonFields, Pokemon, PokemonRequest, UpdatePokemonUseCase} from "@pokemon/domain";

export class EditPokemonController extends AbstractAddEditController{
    private editPokemonUseCase: UpdatePokemonUseCase;

    constructor(editPokemonUseCase: UpdatePokemonUseCase) {
        super();
        this.editPokemonUseCase = editPokemonUseCase;
    }

    update(id: string, pokemonRequest: PokemonRequest): Promise<Pokemon> {
        return this.editPokemonUseCase.execute(id, pokemonRequest);
    }

    validate(): Promise<Map<NewPokemonFields, string>> {
        return this.editPokemonUseCase.validate(new PokemonRequest(this.pokemonPresenter.hp, this.pokemonPresenter.cp, this.pokemonPresenter.name, this.pokemonPresenter.picture));
    }

}