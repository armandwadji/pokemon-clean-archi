import {
  INGXLoggerMetadata,
  NgxLoggerLevel,
  NGXLoggerServerService,
} from 'ngx-logger';
import { inject, Injectable, NgZone } from '@angular/core';
import { HttpBackend, HttpHeaders, HttpRequest } from '@angular/common/http';

@Injectable()
export class LoggerInterceptor extends NGXLoggerServerService {
  constructor() {
    super(inject(HttpBackend), inject(NgZone));
  }

  /**
   * interception des logs et personnalisation du body avant le post au Backend
   * @param metadata
   */
  public override customiseRequestBody(metadata: INGXLoggerMetadata): any {
    // Customise the request body if needed
    return {
      log_level: NgxLoggerLevel[metadata.level].toLowerCase(),
      message: metadata.message,
      browser: window.navigator.userAgent,
    };
  }

  /**
   * interception des logs et ajout du bearer token dans les headers avant le post au backend
   * A conserver en plus d'un headerInterceptor
   * @param request
   */
  public override alterHttpRequest(
    request: HttpRequest<any>,
  ): HttpRequest<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer XXXX-XXXX-XXXX-XXXX`,
    });

    return request.clone({ headers });
  }
}
