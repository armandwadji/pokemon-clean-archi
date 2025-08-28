import { TestBed } from '@angular/core/testing';
import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';

import { headerInterceptor } from './header.interceptor';
import { of } from 'rxjs';

describe('headerInterceptor', () => {
  const url = 'https://api.example.com/data';
  const interceptor: HttpInterceptorFn = (req, next) =>
    TestBed.runInInjectionContext(() => headerInterceptor(req, next));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should add headers when all request', () => {
    // GIVEN
    const mockRequest = new HttpRequest('GET', url);
    const mockHandler: HttpHandlerFn = jest.fn(() => {
      return of(new HttpResponse({ body: { message: 'success' } }));
    });

    // WHEN
    TestBed.runInInjectionContext(() => {
      headerInterceptor(mockRequest, mockHandler).subscribe();
    });

    // THEN
    expect(mockHandler).toHaveBeenCalledWith(
      expect.objectContaining({
        url: url,
        method: 'GET',
      }),
    );
    const calledReq = (mockHandler as jest.Mock).mock.calls[0][0];
    expect(calledReq.headers.get('Authorization')).toBe(
      'Bearer XXXX-XXXX-XXXX-XXXX',
    );
  });
});
