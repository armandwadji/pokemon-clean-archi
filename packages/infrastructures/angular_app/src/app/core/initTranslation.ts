import {HttpBackend, HttpRequest, HttpResponse} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {TranslateService} from '../shared/service/translate/translate.service';
import {map} from 'rxjs';
import {NestedObjects} from '../shared/model/translate.model';

@Injectable({
  providedIn: 'root',
})
export class InitTranslation{
  private readonly http: HttpBackend = inject(HttpBackend);
  private readonly translateService: TranslateService = inject(TranslateService);

  translation() {
    const userLang = navigator.language.split('-')[0];
    const url = `assets/i18n/${userLang}.json`;
    return this.http.handle(
      new HttpRequest('GET', url, {observe: 'body', responseType: 'json'})
    ).pipe(
      map((translation)=>{
        const body = (translation as HttpResponse<typeof import('../../assets/i18n/fr.json')>).body;
        this.translateService.translation = body as NestedObjects;
      })
    )
  }
}
