import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { ApiUtilService } from './api-util.service';
import { ConfigService } from '../configuration/config.service';

@Injectable({
  providedIn: 'root'
})
export class AllServService {

  constructor(
		public authService: AuthService,
		public httpClient: HttpClient,
		public apiUtilService: ApiUtilService,
		public configService: ConfigService
) { }
}
