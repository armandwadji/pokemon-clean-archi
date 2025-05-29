import {ApplicationConfig, InjectionToken, provideZoneChangeDetection} from '@angular/core';
import {PreloadAllModules, provideRouter, withComponentInputBinding, withPreloading} from '@angular/router';
import {routes} from './app.routes';
import {firstValueFrom} from 'rxjs';
import {HttpClient as AngularHttpClient, provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {
  AddPokemonUseCase,
  DeletePokemonUseCase,
  GetPokemonsUseCase,
  GetPokemonUseCase,
  PokemonRepository,
  UpdatePokemonUseCase
} from '@pokemon/domain';
import {
  AddedPokemonController,
  DeletePokemonController,
  EditPokemonController,
  GetPokemonController,
  GetPokemonsController,
  HttpClient,
  PokemonRepositoryInMemory
} from '@pokemon/web-adapters';


export const IHttpClient = new InjectionToken<HttpClient>('HttpClient');
export const IPokemonRepository = new InjectionToken<PokemonRepository>('PokemonRepository')

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
    {
      provide: IPokemonRepository,
      useFactory: (): PokemonRepository => new PokemonRepositoryInMemory(),
    },
    /*    {
          provide: IPokemonRepository,
          useFactory: (httpClient: HttpClient) : PokemonRepository => new PokemonRepositoryHttp(httpClient),
          deps: [IHttpClient]
        },*/
    {
      provide: GetPokemonsUseCase,
      useFactory: (pokemonRepository: PokemonRepository): GetPokemonsUseCase => new GetPokemonsUseCase(pokemonRepository),
      deps: [IPokemonRepository]
    },
    {
      provide: GetPokemonsController,
      useFactory: (getPokemonsUseCase: GetPokemonsUseCase): GetPokemonsController => new GetPokemonsController(getPokemonsUseCase),
      deps: [GetPokemonsUseCase]
    },
    {
      provide: GetPokemonUseCase,
      useFactory: (pokemonRepository: PokemonRepository): GetPokemonUseCase => new GetPokemonUseCase(pokemonRepository),
      deps: [IPokemonRepository]
    },
    {
      provide: GetPokemonController,
      useFactory: (getPokemonsUseCase: GetPokemonUseCase): GetPokemonController => new GetPokemonController(getPokemonsUseCase),
      deps: [GetPokemonUseCase]
    },
    {
      provide: AddPokemonUseCase,
      useFactory: (pokemonRepository: PokemonRepository): AddPokemonUseCase => new AddPokemonUseCase(pokemonRepository),
      deps: [IPokemonRepository]
    },
    {
      provide: AddedPokemonController,
      useFactory: (addPokemonUseCase: AddPokemonUseCase): AddedPokemonController => new AddedPokemonController(addPokemonUseCase),
      deps: [AddPokemonUseCase]
    },
    {
      provide: UpdatePokemonUseCase,
      useFactory: (pokemonRepository: PokemonRepository): UpdatePokemonUseCase => new UpdatePokemonUseCase(pokemonRepository),
      deps: [IPokemonRepository]
    },
    {
      provide: EditPokemonController,
      useFactory: (editPokemonUseCase: UpdatePokemonUseCase): EditPokemonController => new EditPokemonController(editPokemonUseCase),
      deps: [UpdatePokemonUseCase]
    },
    {
      provide: DeletePokemonUseCase,
      useFactory: (pokemonRepository: PokemonRepository): DeletePokemonUseCase => new DeletePokemonUseCase(pokemonRepository),
      deps: [IPokemonRepository]
    },
    {
      provide: DeletePokemonController,
      useFactory: (editPokemonUseCase: DeletePokemonUseCase): DeletePokemonController => new DeletePokemonController(editPokemonUseCase),
      deps: [DeletePokemonUseCase]
    },
    provideHttpClient(withInterceptorsFromDi()),
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes, withPreloading(PreloadAllModules), withComponentInputBinding(),)
  ]
};
