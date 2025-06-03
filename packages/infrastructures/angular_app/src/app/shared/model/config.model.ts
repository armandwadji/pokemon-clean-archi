export class Config {
  private readonly _keepAliveActive: boolean;
  private readonly _keepAlivePing: number;
  private readonly _keepAliveIdle: number;
  private readonly _keepAliveTimeout: number;
  private readonly _apiUrl: string;
  private readonly _pokemonDataProviderVersion: string;

  constructor(config: any) {
    this._keepAliveActive = config?.keepAliveActive;
    this._keepAlivePing = config?.keepAlivePing;
    this._keepAliveIdle = config?.keepAliveIdle;
    this._keepAliveTimeout = config?.keepAliveTimeout;
    this._apiUrl = config?.apiUrl;
    this._pokemonDataProviderVersion = config?.pokemonDataProviderVersion
  }

  get keepAliveActive(): boolean {
    return this._keepAliveActive;
  }

  get keepAlivePing(): number {
    return this._keepAlivePing;
  }

  get keepAliveIdle(): number {
    return this._keepAliveIdle;
  }

  get keepAliveTimeout(): number {
    return this._keepAliveTimeout;
  }

  get apiUrl(): string {
    return this._apiUrl;
  }

  get pokemonDataProviderVersion(): string {
    return this._pokemonDataProviderVersion;
  }
}
