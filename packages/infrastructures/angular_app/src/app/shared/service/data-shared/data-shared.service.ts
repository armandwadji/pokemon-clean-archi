import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import {StorageService} from '../storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class DataSharedService {
  private readonly storageService : StorageService = inject(StorageService);
  private readonly _pokemonTypes: WritableSignal<string[]>;

  constructor() {
    this._pokemonTypes = signal([]);
  }

  get pokemonTypes(): string[] {
    this._pokemonTypes.set(this.storageService.pokemonTypes)
    return this._pokemonTypes();
  }

  set pokemonTypes(value: string[]) {
    this._pokemonTypes.set(value);
    this.storageService.pokemonTypes = this._pokemonTypes()
  }
}
