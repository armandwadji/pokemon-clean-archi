import { TranslatePipe } from './translate.pipe';
import { DotNotation } from '../../model/translate.model';
import { TestBed } from '@angular/core/testing';
import { TranslateService } from '../../service/translate/translate.service';

describe('TranslatePipe', () => {
  let translateService: jest.Mocked<TranslateService>;
  let pipe: TranslatePipe;

  beforeEach(() => {
    translateService = {
      translate: jest.fn().mockReturnValue('Translated Text'),
    } as unknown as jest.Mocked<TranslateService>;

    TestBed.configureTestingModule({
      providers: [{ provide: TranslateService, useValue: translateService }],
    });

    pipe = new TranslatePipe(translateService);
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform a translation key with no arguments', () => {
    // GIVEN
    jest.spyOn(translateService, 'translate');

    // WHEN
    pipe.transform(
      'greeting' as DotNotation<
        typeof import('../../../../assets/i18n/fr.json')
      >,
      [],
    );

    // THEN
    expect(translateService.translate).toHaveBeenCalledWith('greeting', []);
  });
});
