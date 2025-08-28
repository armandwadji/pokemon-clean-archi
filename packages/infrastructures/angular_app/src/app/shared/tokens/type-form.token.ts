import { InjectionToken } from '@angular/core';
import { TypeFormEnum } from '../model/enum/type-form.enum';

export const typeFormEnumToken = new InjectionToken<TypeFormEnum>(
  'typeFormEnumToken',
  {
    providedIn: 'root',
    factory: () => TypeFormEnum.CREATE,
  },
);
