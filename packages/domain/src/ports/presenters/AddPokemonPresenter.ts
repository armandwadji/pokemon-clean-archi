import {Pokemon} from "../../entities/Pokemon";

export enum NewPokemonFields {HP = 'hp', CP = 'cp', NAME = 'name', PICTURE = 'picture', TYPES = 'types'}
export type AddCityErrors = Map<NewPokemonFields, string>

export interface AddPokemonPresenter {
    notifyNewPokemonInvalid(errors: AddCityErrors): void;
    notifyPokemonAdded(pokemon: Pokemon): void;
}