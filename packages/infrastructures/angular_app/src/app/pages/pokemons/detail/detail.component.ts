import {Component, DestroyRef, inject, input, InputSignal,} from '@angular/core';
import {PokemonTypeColorPipe} from '../../../shared/pipe/pokemon-type-color.pipe';
import {DatePipe} from '@angular/common';
import {LoaderComponent} from '../../../shared/component/loader/loader.component';
import {routesName} from '../../../app-routing-config';
import {Router} from '@angular/router';
import {Pokemon} from '@pokemon/domain';
import {DeletePokemonController} from '@pokemon/web-adapters';
import {from} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-detail',
  imports: [PokemonTypeColorPipe, DatePipe, LoaderComponent],
  templateUrl: './detail.component.html',
})
export class DetailComponent {
  pokemon: InputSignal<Pokemon> = input.required();

  private readonly router: Router = inject(Router);
  private destroyRef: DestroyRef = inject(DestroyRef);
  private readonly controller: DeletePokemonController = inject(DeletePokemonController);


  goToPokemonList() {
    this.router.navigate([routesName.pokemon.path]);
  }

  goToEditPokemon(pokemon: Pokemon) {
    this.router.navigate([
      routesName.pokemon.children.editing.fullPath,
      pokemon.id,
    ]);
  }

  deletePokemon(pokemon: Pokemon): void {
    from(this.controller.delete(pokemon.id))
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.router.navigate([routesName.pokemon.path]);
        },
        error: (err) => {
          console.error('Error deleting pokemon:', err);
        }
      })
  }
}
