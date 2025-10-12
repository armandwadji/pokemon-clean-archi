import { Pipe, PipeTransform } from '@angular/core';
import { ArgTranslate, DotNotation } from '../../model/translate.model';
import { TranslateService } from '../../service/translate/translate.service';

@Pipe({
  name: 'translate',
  standalone: true,
})
export class TranslatePipe implements PipeTransform {
  private translateService: TranslateService;

  constructor(translateService: TranslateService) {
    this.translateService = translateService;
  }

  transform(
    value: DotNotation<typeof import('../../../../assets/i18n/fr.json')>,
    args?: ArgTranslate[],
  ): string {
    return this.translateService.translate(value, args).toString();
  }
}
