import {bootstrapApplication} from '@angular/platform-browser';
import {AppComponent} from './app/app.component';
import {registerLocaleData} from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import {appConfig} from './app/core/app.config';
import {importProvidersFrom, inject, LOCALE_ID, provideAppInitializer, provideZoneChangeDetection} from '@angular/core';
import {InitTranslation} from './app/core/initTranslation';
import {Config} from './app/shared/model/config.model';
import {Init} from './app/core/init';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {PreloadAllModules, provideRouter, withComponentInputBinding, withPreloading} from '@angular/router';
import {routes} from './app/app.routes';
import {LoggerModule, NgxLoggerLevel, TOKEN_LOGGER_SERVER_SERVICE} from 'ngx-logger';
import {LoggerInterceptor} from './app/core/interceptors/logger/logger.interceptor';
import {headerInterceptor} from './app/core/interceptors/header/header.interceptor';

registerLocaleData(localeFr);
bootstrapApplication(AppComponent, {
  providers: [
    {provide: LOCALE_ID, useValue: 'fr-FR'},
    importProvidersFrom(
      LoggerModule.forRoot(
        {
          level: NgxLoggerLevel.TRACE,
          serverLogLevel: NgxLoggerLevel.TRACE,
        },
        {
          serverProvider: {
            provide: TOKEN_LOGGER_SERVER_SERVICE,
            useClass: LoggerInterceptor
          }
        }
      ),
    ),
    provideAppInitializer(() => inject(InitTranslation).translation()),
    provideAppInitializer((): Promise<Config> => inject(Init).fetchConfig()),
    provideHttpClient(withInterceptors([headerInterceptor])),
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(
      routes,
      withPreloading(PreloadAllModules),
      withComponentInputBinding()
    ),
    ...appConfig.providers,
  ],
})
  .catch((err) => console.error(err));
