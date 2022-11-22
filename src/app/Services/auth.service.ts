import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { REST_API_SERVER } from '../Common/Constants';
import { LoginResponse } from '../Models/Response/LoginResponse';
import { Result } from '../Models/Result';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) {}

  login(username:string, password:string) : Observable<Result<LoginResponse>> {
    const url = `${REST_API_SERVER}` + 'accounts/login';
    return this.httpClient.post<Result<LoginResponse>>(url, {username: username, password: password} , {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ` + token
      }
      ),
    });
  }

  createAccount(username:string, password:string, confirmPassword:string): Observable<Result<LoginResponse>> {
    const url = `${REST_API_SERVER}` + 'accounts/create-account';
    return this.httpClient.post<Result<LoginResponse>>(url, {'username': username, 'password': password, 'confirm_password': confirmPassword} , {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ` + token
      }
      ),
    });
  }

  changePassword(token:string, oldPassword:string, password:string, confirmPassword:string): Observable<Result<boolean>> {
    const url = `${REST_API_SERVER}` + 'accounts/change-password';
    return this.httpClient.put<Result<boolean>>(url, {'old_password': oldPassword, 'password': password, 'confirm_password': confirmPassword} , {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ` + token
      }
      ),
    });
  }
}
