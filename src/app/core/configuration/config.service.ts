import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export const CONFIG_PATH = 'assets/conf.json';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private config: any;

  constructor(private httpClient: HttpClient) { 

  }

  public async configure() {
    await this.httpClient.get(CONFIG_PATH).toPromise()
            .then(conf => {
                    this.config = conf;
                    // this.configChanged.emit();
                }
            );
  }

  public get(key: string): any {
    return this.config ? this.config[key] : null;
  }

}
