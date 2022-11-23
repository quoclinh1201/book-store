import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Result } from '../Models/Result';
import { Observable } from 'rxjs';
import { REST_API_SERVER } from '../Common/Constants';
import { GetOwnProfileResponse } from '../Models/Response/GetOwnProfileResponse';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  getProfile(token:string): Observable<Result<GetOwnProfileResponse>> {
    const url = `${REST_API_SERVER}` + 'users';
    return this.httpClient.get<Result<GetOwnProfileResponse>>(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ` + token,
      }),
    });
  }

  updateProfile(token:string, fullname:string, email:string, phone:string, gender:boolean) :Observable<Result<GetOwnProfileResponse>> {
    const url = `${REST_API_SERVER}` + 'users';
    return this.httpClient.put<Result<GetOwnProfileResponse>>(url,{'full_name': fullname, 'email':email, 'phone_number':phone, 'gender':gender}, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ` + token,
      }),
    });
  }

  changeAvatar(token:string, filee:File) : Observable<Result<GetOwnProfileResponse>> {
    console.log(filee);
    const url = `${REST_API_SERVER}` + 'users/change-avatar';
    let file = new FormData(); 
    file.append("image", filee);
    return this.httpClient.put<Result<GetOwnProfileResponse>>(url, file, {
      headers: new HttpHeaders({
        'Content-Type':  "multipart/form-data; boundary=AaB03x" +
          "--AaB03x" +
          "Content-Disposition: file" +
          "Content-Type: image/jpeg" +
          "Content-Transfer-Encoding: binary" +
          "...data... " +
          "--AaB03x--",
        Accept: "*/*",
        type: "formData",
        Authorization: `Bearer ` + token,
      }),
    });
  }
}
