import {Injectable} from '@angular/core';
import {JsonUtils} from '../../utils/json.utils';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private _pokemonTypes: string[];

  get pokemonTypes(): string[] {
    let value: string[] = this._pokemonTypes;

    if (
      !this._pokemonTypes &&
      localStorage.getItem(localStorageEnum.POKEMON_TYPES)
    ) {
      value = JsonUtils.tryParse<string[]>(
        localStorage.getItem(localStorageEnum.POKEMON_TYPES) as string,
      );
      this.pokemonTypes = value;
    }

    return value;
  }

  set pokemonTypes(isLoggedIn: string[]) {
    this._pokemonTypes = isLoggedIn;
    localStorage.setItem(
      localStorageEnum.POKEMON_TYPES,
      JsonUtils.tryStringify<string[]>(isLoggedIn),
    );
  }
}

enum localStorageEnum {
  POKEMON_TYPES = 'pokemonTypes',
}
