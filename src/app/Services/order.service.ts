import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Result } from '../Models/Result';
import { Observable } from 'rxjs';
import { REST_API_SERVER } from '../Common/Constants';
import { OrderResponse } from '../Models/Response/OrderResponse';
import { PagedResult } from '../Models/PagedResult';
import { GetListOrderResponse } from '../Models/Response/GetListOrderResponse';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient: HttpClient) { }

  createOrder(token:string, payment_method:string, delivery_information:number): Observable<Result<number>> {
    const url = `${REST_API_SERVER}` + 'orders';
    return this.httpClient.post<Result<number>>(url, {payment_method: payment_method, delivery_information: delivery_information}, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ` + token,
      }),
    });
  }

  getListOrders(token:string): Observable<Result<GetListOrderResponse[]>> {
    const url = `${REST_API_SERVER}` + 'orders';
    return this.httpClient.get<Result<GetListOrderResponse[]>>(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ` + token,
      }),
    });
  }

  getOrderDetailById(token:string, orderId:number):Observable<Result<OrderResponse>> {
    const url = `${REST_API_SERVER}` + 'orders/' + orderId;
    return this.httpClient.get<Result<OrderResponse>>(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ` + token,
      }),
    });
  }

  cancelOrder(token:string, orderId:number):Observable<Result<boolean>> {
    const url = `${REST_API_SERVER}` + 'orders/' + orderId;
    return this.httpClient.delete<Result<boolean>>(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ` + token,
      }),
    });
  }

  reOrder(token:string, orderId:number): Observable<Result<boolean>> {
    const url = `${REST_API_SERVER}` + 'orders/' + orderId;
    return this.httpClient.post<Result<boolean>>(url, {}, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ` + token,
      }),
    });
  }
  
}
