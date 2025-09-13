import { ArgTranslate, NestedObjects } from "../../model/translate.model";

export class TranslateService {
  private readonly _translation: typeof import("../../../../public/i18n/fr.json");
  private cache: NestedObjects = {};

  constructor(translation: typeof import("../../../../public/i18n/fr.json")) {
    this._translation = translation;
  }

  translate(key: string, args?: ArgTranslate[]): string | NestedObjects {
    if (this.cache[key] && !args) return this.cache[key];

    const keys = key.split(".");
    let value: NestedObjects | string = this._translation;

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
            ? (arg.value ?? "").toLocaleString("fr-FR", {
                style: "currency",
                currency: "EUR",
              })
            : (arg.value ?? "").toString(),
        ) as unknown as NestedObjects;
      });
    }

    return value;
  }
}
