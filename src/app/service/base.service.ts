import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConstants } from '../app_setting/app-constants';
import { BaseResponse } from '../model/base-response';

const httpOptions = {
  headers : new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(protected httpClient: HttpClient) {}

  baseAPI = '94.74.86.174:8080/api/';

  private buildHttpsHeaders() {
    const token = localStorage.getItem(AppConstants.TokenId);
    if (token === '' || token === undefined || token === null) {
      return;
    }

    httpOptions.headers = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set(AppConstants.TokenId, 'Bearer ' + token)
        ;
  }

  get: Function = (url: string) => {
    this.buildHttpsHeaders();
    return this.httpClient.get<BaseResponse>(`${this.baseAPI}${url}`, httpOptions);
  }

  post: Function = (url: string, param: any) => {
    this.buildHttpsHeaders();

    return this.httpClient.post<BaseResponse>(`${this.baseAPI}${url}`, param, httpOptions);
  }

  put: Function = (url: string, param: any) => {
    this.buildHttpsHeaders();

    return this.httpClient.put<BaseResponse>(`${this.baseAPI}${url}`, param, httpOptions);
  }

  delete: Function = (url: string, param: any) => {
    this.buildHttpsHeaders();

    return this.httpClient.delete<BaseResponse>(`${this.baseAPI}${url}`, param);
  }
}
