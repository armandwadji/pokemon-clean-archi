import {InjectionToken} from '@angular/core';
import {HttpClient} from '@pokemon/web-adapters';

export const IHttpClient = new InjectionToken<HttpClient>('HttpClient');
