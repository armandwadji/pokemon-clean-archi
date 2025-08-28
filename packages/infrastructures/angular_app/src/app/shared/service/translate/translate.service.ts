import { Injectable, signal, WritableSignal } from '@angular/core';
import { ArgTranslate, NestedObjects } from '../../model/translate.model';

@Injectable({
  providedIn: 'root',
})
export class TranslateService {
  private _translation: WritableSignal<NestedObjects> = signal<NestedObjects>(
    {},
  );
  private cache: NestedObjects = {};

  get translation(): NestedObjects {
    return this._translation();
  }

  set translation(value: NestedObjects) {
    this._translation.set(value);
  }

  translate(key: string, args?: ArgTranslate[]): string | NestedObjects {
    if (this.cache[key] && !args) return this.cache[key];

    const keys = key.split('.');
    let value: NestedObjects | string = this.translation;

    for (const k of keys) {
      value = value?.[k] as NestedObjects;
      if (!value) return key;
    }

    this.cache[key] = value;

    //replace variables
    if (args?.length) {
      args.forEach((arg: ArgTranslate, index: number) => {
        const placeholder = `$${index + 1}`;
        value = value.toString().replace(
          placeholder,
          arg.isCurrency
            ? (arg.value ?? '').toLocaleString('fr-FR', {
                style: 'currency',
                currency: 'EUR',
              })
            : (arg.value ?? '').toString(),
        ) as unknown as NestedObjects;
      });
    }

    return value;
  }
}
