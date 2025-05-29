import {ActivatedRouteSnapshot, MaybeAsync, ResolveFn} from '@angular/router';
import {Pokemon} from '@pokemon/domain';
import {GetPokemonController, PokemonPresenterVM} from '@pokemon/web-adapters';
import {inject} from '@angular/core';
import {from, map} from 'rxjs';

export const pokemonResolver: ResolveFn<MaybeAsync<Pokemon>> = (route: ActivatedRouteSnapshot): MaybeAsync<Pokemon> => {
  const controller: GetPokemonController = inject(GetPokemonController);
  const id = route.paramMap.get('id') as string;
  if (!id) {
    throw new Error('Pokemon ID is required for the resolver');
  }
  return from(controller.getPokemon(id))
    .pipe(map((vm: PokemonPresenterVM) => vm.pokemon as Pokemon))
};
