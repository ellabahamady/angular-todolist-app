import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { AppConstants } from '../app_setting/app-constants';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends BaseService {
  login(param: any, onSuccess: (data: any) => void, onError: (data: any) => void): any {
    this.logout();

    this.post('/login', param)
      .subscribe(
        (        resp: { statusCode: number; data: { token: string; }; alert: any; }) => {
          if (resp.statusCode === 2110) {
            localStorage.setItem(AppConstants.TokenId, resp.data.token);
          } else {
            onError(resp.alert);
          }
        });
  }

  register(param: any, onSuccess: (data: any) => void, onError: (data: any) => void): any {
    this.logout();

    this.post('/register', param)
      .subscribe(
        (        resp: { statusCode: number; message: any; }) => {
          if (resp.statusCode === 200) {
            onSuccess(resp.message);
          } else {
            onError(resp.message);
          }
        },
        (        err: any) => {
            if (onError) {
                onError(err);
            }
        });
      }

  logout(): void {
    localStorage.setItem(AppConstants.TokenId, '');
    localStorage.clear();
  }
}
