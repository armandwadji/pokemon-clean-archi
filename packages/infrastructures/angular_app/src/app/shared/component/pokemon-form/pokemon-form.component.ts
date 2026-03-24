import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  InputSignal,
  linkedSignal,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { Router } from '@angular/router';

import { LoaderComponent } from '../loader/loader.component';
import { PokemonTypeColorPipe } from '../../pipe/type-color/pokemon-type-color.pipe';
import { routesName } from '../../../app-routing-config';
import { Pokemon, PokemonRequest } from '@pokemon/domain';
import {
  AddedPokemonController,
  EditPokemonController,
} from '@pokemon/web-adapters';
import { DataSharedService } from '../../service/data-shared/data-shared.service';
import { Builder } from 'builder-pattern';
import { TypeFormEnum } from '../../model/enum/type-form.enum';
import { TranslatePipe } from '../../pipe/translate/translate.pipe';
import { typeFormEnumToken } from '../../tokens/type-form.token';
import {
  apply,
  FieldTree,
  form,
  FormField,
  submit,
  validate,
} from '@angular/forms/signals';
import { createPokemonSchemaValidator } from '../../utils/validate-async.util';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-pokemon-form',
  templateUrl: './pokemon-form.component.html',
  styleUrl: './pokemon-form.component.scss',
  imports: [
    LoaderComponent,
    PokemonTypeColorPipe,
    TranslatePipe,
    FormField,
    JsonPipe,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonFormComponent {
  pokemon: InputSignal<Pokemon> = input.required();
  private pokemonSignal: WritableSignal<Pokemon> = linkedSignal(() =>
    this.pokemon(),
  );

  private readonly router: Router = inject(Router);
  private readonly typeForm: TypeFormEnum = inject(typeFormEnumToken);
  private readonly dataShared: DataSharedService = inject(DataSharedService);
  private readonly addController: AddedPokemonController = inject(
    AddedPokemonController,
  );
  private readonly editController: EditPokemonController = inject(
    EditPokemonController,
  );

  protected isAddForm: Signal<boolean> = computed(
    () => this.typeForm === TypeFormEnum.CREATE,
  );

  protected types: WritableSignal<string[]> = signal(
    this.dataShared.pokemonTypes,
  );

  protected form: FieldTree<Pokemon> = form(
    this.pokemonSignal,
    (pokemonSchema) => {
      const controller: AddedPokemonController | EditPokemonController =
        this.isAddForm() ? this.addController : this.editController;

      apply(pokemonSchema, createPokemonSchemaValidator(controller));

      validate(pokemonSchema.types, ({ value: types }) => {
        if (types.length === 1) {
          return {
            kind: 'typesError',
            message: 'At least one type must be selected',
          };
        }
        if (types.length === 3) {
          return {
            kind: 'typesError',
            message: 'No more than three types can be selected',
          };
        }
        return null;
      });
    },
  );

  /**
   * Cette méthode permet de cocher les types de pokemon présent dans la liste du pokémon courant.
   * @param type
   * @return boolean
   */
  hasType(type: string): boolean {
    const types: string[] = this.form.types().value() || [];
    return types.includes(type);
  }

  /**
   * Cette méthode permet d'ajouter ou retirer un type dans la liste des types d'un Pokemon
   * @param isChecked
   * @param type
   */
  selectType(isChecked: boolean, type: string): void {
    let types: string[] = this.form.types().value();

    if (isChecked) {
      types = [...types, type];
    } else {
      types = types.filter((currentType: string) => currentType !== type);
    }

    this.form().value.update((previous) => ({ ...previous, types }));
  }

  /**
   * Cette methode permet de griser les boutons de catégories si la liste des catégories du pokémon est égale à UN ou à 3.
   * @param type
   * @returns boolean
   */
  isTypesValid(type: string): boolean {
    const types: string[] = this.form.types().value();
    if (types.length === 1 && this.hasType(type)) {
      return false;
    }
    return !(types.length > 2 && !this.hasType(type));
  }

  /**
   * Cette méthode ajoute ou édite un pokémon.
   */
  onSubmit($event: Event): void {
    $event.preventDefault();

    const errors = this.form().errorSummary();
    if (errors.length > 0) {
      errors[0].fieldTree().focusBoundControl();
    } else {
      submit(this.form, async () => {
        const pokemonData: Pokemon = this.form().value();

        const pokemonRequest: PokemonRequest = Builder<PokemonRequest>()
          .hp(pokemonData.hp)
          .cp(pokemonData.cp)
          .name(pokemonData.name)
          .picture(pokemonData.picture)
          .types(pokemonData.types)
          .created(pokemonData.created)
          .build();

        let pokemonResponse: Pokemon;
        try {
          if (this.isAddForm()) {
            pokemonResponse = await this.addController.create(pokemonRequest);
          } else {
            pokemonResponse = await this.editController.update(
              this.pokemon().id,
              pokemonRequest,
            );
          }
          await this.router.navigate([
            routesName.pokemon.children.detail.fullPath,
            pokemonResponse.id,
          ]);
          return null;
        } catch (err) {
          return [];
        }
      });
    }
  }
}
