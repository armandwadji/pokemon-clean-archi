import {ApplicationConfig, inject} from '@angular/core';
import {firstValueFrom} from 'rxjs';
import {HttpClient as AngularHttpClient} from '@angular/common/http';
import {
  AddPokemonUseCase,
  DeletePokemonUseCase,
  GetPokemonsUseCase,
  GetPokemonUseCase,
  IPokemonDataProviderBoundary,
  UpdatePokemonUseCase
} from '@pokemon/domain';
import {
  AddedPokemonController,
  DeletePokemonController,
  EditPokemonController,
  GetPokemonController,
  GetPokemonsController,
  HttpClient,
  PokemonDataProviderFactory
} from '@pokemon/web-adapters';
import {Init} from './init';
import {IPokemonDataProviderToken} from '../shared/tokens/pokemon-dataprovider.token';
import {IHttpClient} from '../shared/tokens/http-client.token';

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: IHttpClient,
      useFactory: (httpClient: AngularHttpClient): HttpClient => ({
        get<T>(url: string): Promise<T> {
          return firstValueFrom(httpClient.get<T>(url));
        },
        post: function <T>(url: string, body: any): Promise<T> {
          return firstValueFrom(httpClient.post<T>(url, body));
        },
        put: function <T>(url: string, body: any): Promise<T> {
          return firstValueFrom(httpClient.put<T>(url, body));
        },
        delete: function <T>(url: string): Promise<T> {
          return firstValueFrom(httpClient.delete<T>(url));
        }
      }),
      deps: [AngularHttpClient]
    },

    /************** POKÉMONS DATA PROVIDERS **************/
    {
      provide: IPokemonDataProviderToken,
      useFactory: () => new PokemonDataProviderFactory(inject(Init).getConfig().pokemonDataProviderVersion)
    },

    /************** GET POKÉMONS **************/
    {
      provide: GetPokemonsUseCase,
      useFactory: (pokemonRepository: IPokemonDataProviderBoundary): GetPokemonsUseCase => new GetPokemonsUseCase(pokemonRepository),
      deps: [IPokemonDataProviderToken]
    },
    {
      provide: GetPokemonsController,
      useFactory: (getPokemonsUseCase: GetPokemonsUseCase): GetPokemonsController => new GetPokemonsController(getPokemonsUseCase),
      deps: [GetPokemonsUseCase]
    },

    /************** GET POKÉMON **************/
    {
      provide: GetPokemonUseCase,
      useFactory: (pokemonRepository: IPokemonDataProviderBoundary): GetPokemonUseCase => new GetPokemonUseCase(pokemonRepository),
      deps: [IPokemonDataProviderToken]
    },
    {
      provide: GetPokemonController,
      useFactory: (getPokemonsUseCase: GetPokemonUseCase): GetPokemonController => new GetPokemonController(getPokemonsUseCase),
      deps: [GetPokemonUseCase]
    },

    /************** POST POKÉMONS **************/
    {
      provide: AddPokemonUseCase,
      useFactory: (pokemonRepository: IPokemonDataProviderBoundary): AddPokemonUseCase => new AddPokemonUseCase(pokemonRepository),
      deps: [IPokemonDataProviderToken]
    },
    {
      provide: AddedPokemonController,
      useFactory: (addPokemonUseCase: AddPokemonUseCase): AddedPokemonController => new AddedPokemonController(addPokemonUseCase),
      deps: [AddPokemonUseCase]
    },

    /************** UPDATE POKÉMONS **************/
    {
      provide: UpdatePokemonUseCase,
      useFactory: (pokemonRepository: IPokemonDataProviderBoundary): UpdatePokemonUseCase => new UpdatePokemonUseCase(pokemonRepository),
      deps: [IPokemonDataProviderToken]
    },
    {
      provide: EditPokemonController,
      useFactory: (editPokemonUseCase: UpdatePokemonUseCase): EditPokemonController => new EditPokemonController(editPokemonUseCase),
      deps: [UpdatePokemonUseCase]
    },

    /************** DELETE POKÉMONS **************/
    {
      provide: DeletePokemonUseCase,
      useFactory: (pokemonRepository: IPokemonDataProviderBoundary): DeletePokemonUseCase => new DeletePokemonUseCase(pokemonRepository),
      deps: [IPokemonDataProviderToken]
    },
    {
      provide: DeletePokemonController,
      useFactory: (editPokemonUseCase: DeletePokemonUseCase): DeletePokemonController => new DeletePokemonController(editPokemonUseCase),
      deps: [DeletePokemonUseCase]
    },
  ]
};
