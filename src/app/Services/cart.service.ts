import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Result } from '../Models/Result';
import { Observable } from 'rxjs';
import { REST_API_SERVER } from '../Common/Constants';
import { CartResponse } from '../Models/Response/CartResponse';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private httpClient: HttpClient) {}

  loadCart(token: string): Observable<Result<CartResponse>> {
    const url = `${REST_API_SERVER}` + 'carts';
    return this.httpClient.get<Result<CartResponse>>(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ` + token,
      }),
    });
  }

  addToCart(token: string, product_id:number, quantity:number): Observable<boolean> {
    const url = `${REST_API_SERVER}` + 'carts/add-to-cart';
    return this.httpClient.post<boolean>(url, {product_id: product_id, quantity: quantity}, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ` + token,
      }),
    });
  }

  increaseProduct(token: string, productId:number): Observable<Result<CartResponse>> {
    const url = `${REST_API_SERVER}` + 'carts/incease-product/' + productId;
    return this.httpClient.put<Result<CartResponse>>(url, {}, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ` + token,
      }),
    });
  }

  decreaseProduct(token: string, productId:number): Observable<Result<CartResponse>> {
    const url = `${REST_API_SERVER}` + 'carts/decease-product/' + productId;
    return this.httpClient.put<Result<CartResponse>>(url, {}, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ` + token,
      }),
    });
  }

  removeProduct(token: string, productId:number): Observable<Result<CartResponse>> {
    const url = `${REST_API_SERVER}` + 'carts/remove-product/' + productId;
    return this.httpClient.delete<Result<CartResponse>>(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ` + token,
      }),
    });
  }
}
