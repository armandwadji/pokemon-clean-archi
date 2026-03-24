import { resource } from '@angular/core';
import {
  Schema,
  schema,
  SchemaPath,
  validateAsync,
} from '@angular/forms/signals';
import { Pokemon } from '@pokemon/domain';
import {
  AddedPokemonController,
  EditPokemonController,
} from '@pokemon/web-adapters';

export interface ValidatorConfig<T> {
  fieldTree: SchemaPath<T, any>;
  fieldName: string;
  validatorFn: (value: T) => Promise<string | undefined>;
}

/**
 * Fonction utilitaire pour valider un champ de manière asynchrone
 * @param config Configuration de la validation
 */
function createAsyncValidator<T>({
  fieldTree,
  fieldName,
  validatorFn,
}: ValidatorConfig<T>): void {
  validateAsync(fieldTree, {
    params: ({ value }) => value(),
    factory: (field: any) =>
      resource({
        params: field,
        loader: async ({ params }) => validatorFn(params as T),
      }),
    onSuccess: (result: string | undefined) =>
      !result ? null : { kind: fieldName, message: result },
    onError: () => ({ kind: fieldName, message: 'Error during validation' }),
  });
}

export function createPokemonSchemaValidator(
  controller: AddedPokemonController | EditPokemonController,
): Schema<Pokemon> {
  return schema<Pokemon>((pokemonSchema) => {
    createAsyncValidator({
      fieldTree: pokemonSchema.name,
      fieldName: 'nameError',
      validatorFn: (name: string) => controller.validateName(name),
    });

    createAsyncValidator({
      fieldTree: pokemonSchema.picture,
      fieldName: 'pictureError',
      validatorFn: (picture: string) => controller.validatePicture(picture),
    });

    createAsyncValidator({
      fieldTree: pokemonSchema.hp,
      fieldName: 'hpError',
      validatorFn: (hp: number) => controller.validateHp(hp),
    });

    createAsyncValidator({
      fieldTree: pokemonSchema.cp,
      fieldName: 'cpError',
      validatorFn: (cp: number) => controller.validateCp(cp),
    });
  });
}
