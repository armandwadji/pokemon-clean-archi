import {AddPokemonUseCase, NewPokemonFields, Pokemon, PokemonRequest} from "@pokemon/domain";
import {AbstractAddEditController} from "./AbstractAddEditController";


export class AddedPokemonController extends AbstractAddEditController{
    private addPokemonUseCase: AddPokemonUseCase;

    constructor(addPokemonUseCase: AddPokemonUseCase) {
        super();
        this.addPokemonUseCase = addPokemonUseCase;
    }

    create(pokemonRequest: PokemonRequest): Promise<Pokemon> {
        return this.addPokemonUseCase.execute(pokemonRequest);
    }


    validate(): Promise<Map<NewPokemonFields, string>> {
        return this.addPokemonUseCase.validate(new PokemonRequest(this.pokemonPresenter.hp, this.pokemonPresenter.cp, this.pokemonPresenter.name, this.pokemonPresenter.picture))
    }
}