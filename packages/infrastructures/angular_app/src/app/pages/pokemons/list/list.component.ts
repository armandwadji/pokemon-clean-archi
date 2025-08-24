import {Component, inject, Signal} from '@angular/core';
import {toSignal} from '@angular/core/rxjs-interop';
import {DatePipe} from '@angular/common';
import {Router} from '@angular/router';
import {GetPokemonsController, PokemonsPresenterVM} from '@pokemon/web-adapters';
import {from, tap} from 'rxjs';
import {Pokemon} from '@pokemon/domain';
import {PokemonTypeColorPipe} from '../../../shared/pipe/type-color/pokemon-type-color.pipe';
import {BorderCardDirective} from '../../../shared/directive/border-card.directive';
import {routesName} from '../../../app-routing-config';
import {LoaderComponent} from '../../../shared/component/loader/loader.component';
import {SearchPokemonComponent} from '../../../shared/component/search-pokemon/search-pokemon.component';
import {DataSharedService} from '../../../shared/service/data-shared/data-shared.service';

@Component({
  selector: 'app-list',
  imports: [
    DatePipe,
    PokemonTypeColorPipe,
    BorderCardDirective,
    LoaderComponent,
    SearchPokemonComponent,
  ],
  templateUrl: './list.component.html',
})
export class ListComponent {
  private readonly router: Router = inject(Router);
  private readonly dataShared: DataSharedService = inject(DataSharedService);
  private readonly controller: GetPokemonsController = inject(GetPokemonsController);

  pokemonList: Signal<PokemonsPresenterVM> = toSignal(
    from(this.controller.getPokemons()).pipe(tap((pokemonsPresenterVM: PokemonsPresenterVM) => this.dataShared.pokemonTypes = pokemonsPresenterVM.pokemonTypes ?? [])),
    {initialValue: {pokemons: [], pokemonTypes: [], pokemonsSearch: undefined}},
  );

  goToPokemon(pokemon: Pokemon): void {
    this.router.navigate([
      routesName.pokemon.children.detail.fullPath,
      pokemon.id,
    ]);
  }

  goToAddPokemon() {
    this.router.navigate([routesName.pokemon.children.add.fullPath]);
  }
}
