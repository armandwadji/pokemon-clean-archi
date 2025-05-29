import {Routes} from '@angular/router';
import {routesName} from './app-routing-config';
import {pokemonResolver} from './shared/resolver/pokemon.resolver';

export const routes: Routes = [
  {
    path: routesName.pokemon.path,
    title: routesName.pokemon.title,
    loadComponent: () =>
      import('./pages/pokemons/pokemon.component').then(
        (m) => m.PokemonComponent,
      ),
    // canActivate: [AuthGuard],
    children: [
      {
        path: routesName.pokemon.children.list.path,
        title: routesName.pokemon.children.list.title,
        loadComponent: () =>
          import('./pages/pokemons/list/list.component').then(
            (m) => m.ListComponent,
          ),
      },
      {
        path: routesName.pokemon.children.add.path,
        title: routesName.pokemon.children.add.title,
        loadComponent: () =>
          import('./pages/pokemons/add/add.component').then(
            (m) => m.AddComponent,
          ),
      },
      {
        path: routesName.pokemon.children.editing.path + '/:id',
        title: routesName.pokemon.children.editing.title,
        loadComponent: () =>
          import('./pages/pokemons/edit/edit.component').then(
            (m) => m.EditComponent,
          ),
        resolve: {
          pokemon: pokemonResolver,
        },
      },

      {
        path: routesName.pokemon.children.detail.path + '/:id',
        title: routesName.pokemon.children.detail.title,
        loadComponent: () =>
          import('./pages/pokemons/detail/detail.component').then(
            (m) => m.DetailComponent,
          ),
        resolve: {
          pokemon: pokemonResolver,
        },
      },
    ],
  },
  { path: '', redirectTo: routesName.pokemon.path, pathMatch: 'full' },
];
