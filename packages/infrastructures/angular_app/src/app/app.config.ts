import {
  ApplicationConfig,
  inject,
  InjectionToken,
  provideAppInitializer,
  provideZoneChangeDetection
} from '@angular/core';
import {PreloadAllModules, provideRouter, withComponentInputBinding, withPreloading} from '@angular/router';
import {routes} from './app.routes';
import {firstValueFrom} from 'rxjs';
import {HttpClient as AngularHttpClient, provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
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
  IPokemonDataProvider,
  PokemonDataProviderFactory
} from '@pokemon/web-adapters';
import {Config} from './shared/model/config.model';
import {Init} from './init';


const IHttpClient = new InjectionToken<HttpClient>('HttpClient');
const IPokemonDataProviderInjectionToken = new InjectionToken<IPokemonDataProvider>('IPokemonDataProviderBoundary')

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

    /************** DATA PROVIDERS **************/
    {
      provide: IPokemonDataProviderInjectionToken,
      useFactory: () => new PokemonDataProviderFactory(inject(Init).getConfig().pokemonDataProviderVersion)
    },

    /************** GET POKÉMONS **************/
    {
      provide: GetPokemonsUseCase,
      useFactory: (pokemonRepository: IPokemonDataProviderBoundary): GetPokemonsUseCase => new GetPokemonsUseCase(pokemonRepository),
      deps: [IPokemonDataProviderInjectionToken]
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
      deps: [IPokemonDataProviderInjectionToken]
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
      deps: [IPokemonDataProviderInjectionToken]
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
      deps: [IPokemonDataProviderInjectionToken]
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
      deps: [IPokemonDataProviderInjectionToken]
    },
    {
      provide: DeletePokemonController,
      useFactory: (editPokemonUseCase: DeletePokemonUseCase): DeletePokemonController => new DeletePokemonController(editPokemonUseCase),
      deps: [DeletePokemonUseCase]
    },

    provideAppInitializer((): Promise<Config> => inject(Init).fetchConfig()),
    provideHttpClient(withInterceptorsFromDi()),
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(
      routes,
      withPreloading(PreloadAllModules),
      withComponentInputBinding()
    )
  ]
};
