import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Page } from 'src/app/shared/models/search';

@Injectable({
  providedIn: 'root'
})
export class ApiUtilService {

  constructor() { }

  // ========================================== Utilità chiamate Api. gestione pagine ===================
  public fillPageInformation(httpParams: HttpParams, page: Page) {
    if (page && page != null && page.pageSize && page.page) {
      httpParams.set('pageSize', String(page.pageSize));
      httpParams.set('page', String(page.page));
    }
  }
}
