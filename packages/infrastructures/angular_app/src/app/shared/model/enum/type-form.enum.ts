import {InjectionToken} from '@angular/core';

export enum TypeFormEnum{
  CREATE = 'CREATE',
  EDIT = "EDIT"
}

export const TYPE_FORM = new InjectionToken<TypeFormEnum>('TYPE_FORM', {
  providedIn: 'root',
  factory: ()=> TypeFormEnum.CREATE,
});
