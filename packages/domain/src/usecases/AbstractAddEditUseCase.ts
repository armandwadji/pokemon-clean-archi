import { PokemonFields, PokemonRequest } from "@pokemon/domain";
import { InputValues, OutputValues } from "./IUseCase";
import { UseCase } from "./UseCase";

export abstract class AbstractAddEditUseCase<
  I extends InputValues,
  O extends OutputValues,
> extends UseCase<I, O> {
  protected constructor() {
    super();
  }

  validate(
    pokemonRequest: PokemonRequest,
  ): Promise<Map<PokemonFields, string>> {
    let errorsMessage = "";
    const errors = new Map<PokemonFields, string>();
    const nameRegex: boolean = new RegExp("^[\\p{L}0-9_.\\s]{1,10}$", "u").test(
      String(pokemonRequest.name),
    );
    const hpRegex: boolean = new RegExp("^[0-9]{1,3}$").test(
      String(pokemonRequest.hp),
    );
    const cpRegex: boolean = new RegExp("^[0-9]{1,2}$").test(
      String(pokemonRequest.cp),
    );
    const pictureRegex: boolean = new RegExp(
      "^https://assets.pokemon.com/assets/cms2/img/pokedex/detail/[0-9]{3}.png$",
    ).test(String(pokemonRequest.picture));

    if (!nameRegex) {
      errorsMessage =
        pokemonRequest.name === ""
          ? "Le nom du pokémon est requis."
          : "Le nom du pokémon doit avoir 10 caractère maximum.";
      errors.set(PokemonFields.NAME, errorsMessage);
    }

    if (!hpRegex) {
      errorsMessage =
        pokemonRequest.hp === null
          ? "Les points de vie du pokémon sont requis."
          : "Les points de vie du pokémon sont compris entre 0 et 999.";
      errors.set(PokemonFields.HP, errorsMessage);
    }

    if (!cpRegex) {
      errorsMessage =
        pokemonRequest.cp === null
          ? "Les dégâts du pokémon sont requis."
          : "Les dégâts du pokémon sont compris entre 0 et 99.";
      errors.set(PokemonFields.CP, errorsMessage);
    }

    if (!pictureRegex) {
      errorsMessage =
        pokemonRequest.picture === ""
          ? "L'image du pokémon est requise."
          : "url de la photo invalide<br />\n" +
            "                    <span\n" +
            "                      ><b>Exemple</b> :\n" +
            "                      https://assets.pokemon.com/assets/cms2/img/pokedex/detail/100.png</span\n" +
            "                    ><br />";
      errors.set(PokemonFields.PICTURE, errorsMessage);
    }

    return Promise.resolve(errors);
  }
}
