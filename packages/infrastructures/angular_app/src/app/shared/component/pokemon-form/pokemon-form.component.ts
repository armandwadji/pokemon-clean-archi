import {
  AfterViewInit,
  Component,
  DestroyRef,
  inject,
  input,
  InputSignal,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule,} from '@angular/forms';

import {LoaderComponent} from '../loader/loader.component';
import {PokemonTypeColorPipe} from '../../pipe/pokemon-type-color.pipe';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {routesName} from '../../../app-routing-config';
import {combineLatest, concatMap, debounceTime, distinctUntilChanged, from, map, Observable, startWith} from 'rxjs';
import {Pokemon, PokemonRequest} from '@pokemon/domain';
import {AddedPokemonController, EditPokemonController} from '@pokemon/web-adapters';
import {DataSharedService} from '../../service/data-shared/data-shared.service';

@Component({
  selector: 'app-pokemon-form',
  standalone: true,
  templateUrl: './pokemon-form.component.html',
  styleUrl: './pokemon-form.component.scss',
  imports: [LoaderComponent, PokemonTypeColorPipe, ReactiveFormsModule],
})
export class PokemonFormComponent implements OnInit , AfterViewInit{
  pokemon: InputSignal<Pokemon> = input.required();

  private readonly router: Router = inject(Router);
  private readonly fb: FormBuilder = inject(FormBuilder);
  private readonly destroyRef: DestroyRef = inject(DestroyRef);
  private readonly dataShared: DataSharedService = inject(DataSharedService);
  private readonly addController: AddedPokemonController = inject(AddedPokemonController);
  private readonly editController: EditPokemonController = inject(EditPokemonController);

  formGroup: FormGroup;
  isAddForm: boolean = this.router.url.includes(routesName.pokemon.children.add.path);

  types: WritableSignal<string[]> = signal(this.dataShared.pokemonTypes);
  pokemonErrors: WritableSignal<PokemonErrors> = signal({
    hpError: undefined,
    cpError: undefined,
    nameError: undefined,
    pictureError: undefined,
  })

  ngOnInit() {
    this.formGroup = this.fb.group({
      id: [this.pokemon()?.id],
      hp: [this.pokemon()?.hp],
      cp: [this.pokemon()?.cp],
      name: [this.pokemon()?.name],
      picture: [this.pokemon()?.picture],
      types: [this.pokemon()?.types],
      created: [this.pokemon()?.created],
    });
  }

  ngAfterViewInit(): void {
    const controller = this.isAddForm ? this.addController : this.editController;
    this.formGroup.valueChanges.pipe(
      takeUntilDestroyed(this.destroyRef),
      debounceTime(200),
      distinctUntilChanged(),
      concatMap((formValue: any) => {
        return combineLatest([
          from(controller.validateName(formValue.name)).pipe(startWith(undefined)),
          from(controller.validateHp(formValue.hp)).pipe(startWith(undefined)),
          from(controller.validateCp(formValue.cp)).pipe(startWith(undefined)),
          from(controller.validatePicture(formValue.picture)).pipe(startWith(undefined)),
        ])
      }),
      map(([nameError, hpError, cpError, pictureError]) => ({nameError, hpError, cpError, pictureError} as PokemonErrors)),
    ).subscribe((pokemonErrors: PokemonErrors) => this.pokemonErrors.set(pokemonErrors))
  }

  /**
   * Cette méthode permet de cocher les types de pokemon présent dans la liste du pokémon courant.
   * @param type
   * @return boolean
   */
  hasType(type: string): boolean {
    const types: string[] = this.formGroup.get('types')?.value;
    return types.includes(type);
  }

  /**
   * Cette méthode permet d'ajouter ou retirer un type dans la liste des types d'un Pokemon
   * @param isChecked
   * @param type
   */
  selectType(isChecked: boolean, type: string): void {
    let types: string[] = this.formGroup.get('types')?.value;

    if (isChecked) {
      types = [...types, type];
    } else {
      types = types.filter((currentType: string) => currentType !== type);
    }

    this.formGroup.get('types')?.patchValue(types);
  }

  /**
   * Cette methode permet de griser les boutons de catégories si la liste des catégories du pokémon est égale à UN ou à 3.
   * @param type
   * @returns boolean
   */
  isTypesValid(type: string): boolean {
    const types: string[] = this.formGroup.get('types')?.value;
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
    $event.stopImmediatePropagation();
    let observable$: Observable<Pokemon>;
    const pokemonRequest : PokemonRequest = {
      hp: this.formGroup.get('hp')?.value,
      cp: this.formGroup.get('cp')?.value,
      name: this.formGroup.get('name')?.value,
      picture: this.formGroup.get('picture')?.value,
      types: this.formGroup.get('types')?.value,
      created: this.formGroup.get('created')?.value,
    };

    if (this.isAddForm) {
      observable$ = from(this.addController.create(pokemonRequest));
    } else {
      observable$ = from(this.editController.update(this.pokemon().id, pokemonRequest));
    }

    observable$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (pokemon: Pokemon)=> {
          this.router.navigate([routesName.pokemon.children.detail.fullPath, pokemon.id]);
        },
        error: (errors: Map<string, string>)=> {
          const pokemonErrors: PokemonErrors = {
            hpError: errors.get('hp'),
            cpError: errors.get('cp'),
            nameError: errors.get('name'),
            pictureError: errors.get('picture'),
          };
          this.pokemonErrors.set(pokemonErrors);
        }
      });
  }
}

interface PokemonErrors {
  hpError: string | undefined;
  cpError: string | undefined;
  nameError: string | undefined;
  pictureError: string | undefined;
}
