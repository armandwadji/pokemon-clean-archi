import {InjectionToken} from '@angular/core';
import {IPokemonDataProvider} from '@pokemon/web-adapters';

export const IPokemonDataProviderToken = new InjectionToken<IPokemonDataProvider>('IPokemonDataProvider');
