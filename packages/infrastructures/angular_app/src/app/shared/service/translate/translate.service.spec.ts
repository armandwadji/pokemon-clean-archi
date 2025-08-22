import {TestBed} from '@angular/core/testing';

import {TranslateService} from './translate.service';

describe('TranslateService', () => {
  let service: TranslateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TranslateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call with value', () => {
    service.translation = {greeting: 'Hello'};

    expect(service.translate('greeting')).toBe('Hello');
  });

  it('should test a translation using variables', () => {
    const expected = 'Hello, John!';
    service.translation = {greeting: 'Hello, $1!'};

    expect(service.translate('greeting', [{value: 'John'}])).toBe(expected);
  });
});
