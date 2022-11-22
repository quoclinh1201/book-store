import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { REST_API_SERVER } from '../Common/Constants';
import { CategoryResponse } from '../Models/Response/CategoryResponse';
import { Result } from '../Models/Result';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private httpClient: HttpClient) {}

  getAllCategories(): Observable<Result<CategoryResponse[]>> {
    const url = `${REST_API_SERVER}` + 'categories';
    return this.httpClient.get<Result<CategoryResponse[]>>(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ` + token
      }),
    });
  }
}
