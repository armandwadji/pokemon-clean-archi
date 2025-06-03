import {Component, inject, Signal, signal, WritableSignal,} from '@angular/core';
import {Router} from '@angular/router';
import {debounceTime, distinctUntilChanged, from, map, switchMap} from 'rxjs';
import {toObservable, toSignal} from '@angular/core/rxjs-interop';
import {routesName} from '../../../app-routing-config';
import {FormsModule} from '@angular/forms';
import {Pokemon} from '@pokemon/domain';
import {GetPokemonsController, PokemonsPresenterVM} from '@pokemon/web-adapters';

@Component({
  selector: 'app-search-pokemon',
  standalone: true,
  templateUrl: './search-pokemon.component.html',
  imports: [FormsModule],
})
export class SearchPokemonComponent {
  private readonly router: Router = inject(Router);
  private readonly controller: GetPokemonsController = inject(GetPokemonsController);

  searchTerms: WritableSignal<string> = signal('');
  pokemons: Signal<Pokemon[] | undefined> = toSignal(
    toObservable(this.searchTerms).pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((search) => from(this.controller.searchPokemonsByName(search))),
      map((response: PokemonsPresenterVM) => {
        return response.pokemonsSearch
      })
    ),
  );

  goToDetail(pokemon: Pokemon) {
    this.router.navigate([
      routesName.pokemon.children.detail.fullPath,
      pokemon.id,
    ]);
  }
}
