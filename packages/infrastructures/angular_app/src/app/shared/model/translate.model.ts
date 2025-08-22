export interface NestedObjects {
  [key: string]: string | NestedObjects;
}

export type DotNotation<T extends NestedObjects>= {
  [K in keyof T & string]: T[K] extends string
    ? K
    : T[K] extends NestedObjects
      ? `${K}.${DotNotation<T[K]>}`
      : never;
}[keyof T & string] ;

export interface ArgTranslate {
  value: number | string | null;
  isCurrency?: boolean;
}
