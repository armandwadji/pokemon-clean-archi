import {Config} from './shared/model/config.model';
import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {firstValueFrom, map, tap} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Init{
  private readonly http: HttpClient = inject(HttpClient);

  private config: Config;
  private configPath = 'assets/config/config.json';

  /**
   * @return {Config} la configuration de l'application
   */
  getConfig(): Config {
    return this.config;
  }

  fetchConfig(): Promise<Config>{
    return firstValueFrom(
      this.http.get(this.configPath).pipe(
        map((config : any) => new Config(config) ),
        tap((config: Config) => this.config = config)
        /*        tap((config: Config) => {
                  if (
                    config.isKeepAliveActive() &&
                    this.dataShared.isLoggedIn &&
                    environment.production
                  ) {
                    this.keepAliveService.KeepAlive(config);
                  }
                }),*/
      ),
    );
  }
}
