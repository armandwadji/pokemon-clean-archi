import { LoggerInterceptor } from './logger.interceptor';
import { TestBed } from '@angular/core/testing';
import { HttpBackend, HttpRequest } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { INGXLoggerMetadata, NgxLoggerLevel } from 'ngx-logger';

describe('LoggerInterceptor', () => {
  let interceptor: LoggerInterceptor;

  beforeAll(() => {
    Object.defineProperty(window, 'navigator', {
      writable: true,
      value: {
        userAgent:
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
      },
    });
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpBackend, LoggerInterceptor, provideHttpClientTesting()],
    });

    interceptor = TestBed.inject(LoggerInterceptor);
  });

  afterEach(() => jest.clearAllMocks());

  describe('customiseRequestBody', () => {
    it.each([
      { level: NgxLoggerLevel.TRACE, expected: 'trace' },
      { level: NgxLoggerLevel.DEBUG, expected: 'debug' },
      { level: NgxLoggerLevel.INFO, expected: 'info' },
      { level: NgxLoggerLevel.WARN, expected: 'warn' },
      { level: NgxLoggerLevel.ERROR, expected: 'error' },
      { level: NgxLoggerLevel.FATAL, expected: 'fatal' },
      { level: NgxLoggerLevel.LOG, expected: 'log' },
    ])(
      'should customize request body with log $level to $expected',
      ({ level, expected }) => {
        // GIVEN
        const metadata: INGXLoggerMetadata = {
          level: level,
          message: 'Test message',
          fileName: 'test-file.ts',
          lineNumber: 42,
          timestamp: new Date().toISOString(),
        };

        // WHEN
        const result = interceptor.customiseRequestBody(metadata);

        // THEN
        expect(result).toEqual({
          log_level: expected,
          message: 'Test message',
          browser:
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
        });
      },
    );
  });

  describe('alterHttpRequest', () => {
    let mockRequest: HttpRequest<any>;

    beforeEach(() => {
      mockRequest = new HttpRequest('POST', 'https://example.com/api', {
        body: { key: 'value' },
      });
    });

    it('should add Authorization headers when both values are available', () => {
      // GIVEN
      const result = interceptor.alterHttpRequest(mockRequest);

      // THEN
      expect(result.headers.get('Authorization')).toBe(
        'Bearer XXXX-XXXX-XXXX-XXXX',
      );
      expect(result.url).toBe('https://example.com/api');
      expect(result.method).toBe('POST');
      expect(result.body).toEqual({ body: { key: 'value' } });
    });
  });
});
