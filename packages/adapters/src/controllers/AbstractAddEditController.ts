import { PokemonFields } from "@pokemon/domain";

export class AddPokemonPresenterVM {
  hp: number | undefined;
  cp: number | undefined;
  name: string | undefined;
  picture: string | undefined;
  types: string[] | undefined;
}

export abstract class AbstractAddEditController {
  protected pokemonPresenter: AddPokemonPresenterVM;

  protected constructor() {
    this.pokemonPresenter = new AddPokemonPresenterVM();
  }

  async validateName(name: string): Promise<string | undefined> {
    this.pokemonPresenter.name = name;
    const errors: Map<PokemonFields, string> = await this.validate();
    return errors.get(PokemonFields.NAME);
  }

  async validateHp(hp: number): Promise<string | undefined> {
    this.pokemonPresenter.hp = hp;
    const errors: Map<PokemonFields, string> = await this.validate();
    return errors.get(PokemonFields.HP);
  }

  async validateCp(cp: number): Promise<string | undefined> {
    this.pokemonPresenter.cp = cp;
    const errors: Map<PokemonFields, string> = await this.validate();
    return errors.get(PokemonFields.CP);
  }

  async validatePicture(picture: string): Promise<string | undefined> {
    this.pokemonPresenter.picture = picture;
    const errors: Map<PokemonFields, string> = await this.validate();
    return errors.get(PokemonFields.PICTURE);
  }

  /*    validateTypes(types: string[]) {
        this.validate();
    }*/

  abstract validate(): Promise<Map<PokemonFields, string>>;
}
