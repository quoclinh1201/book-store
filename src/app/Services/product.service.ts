import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { REST_API_SERVER } from '../Common/Constants';
import { PagedResult } from '../Models/PagedResult';
import { GetListProductResponse } from '../Models/Response/GetListProductResponse';
import { ProductResponse } from '../Models/Response/ProductResponse';
import { Result } from '../Models/Result';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClient: HttpClient) {}

  public getListProduct(
    subUrl: string = ''
  ): Observable<PagedResult<GetListProductResponse>> {
    const url = `${REST_API_SERVER}` + 'products' + subUrl;
    return this.httpClient.get<PagedResult<GetListProductResponse>>(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ` + token
      }),
    });
  }

  public getProductById(id: number) : Observable<Result<ProductResponse>>{
    const url = `${REST_API_SERVER}` + 'products/' + id;
    return this.httpClient.get<Result<ProductResponse>>(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ` + token
      }),
    });
  }

  //
}
