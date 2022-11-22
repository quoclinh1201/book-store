import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Result } from '../Models/Result';
import { Observable } from 'rxjs';
import { REST_API_SERVER } from '../Common/Constants';
import { DeliveryInformaionResponse } from '../Models/Response/DeliveryInformaionResponse';

@Injectable({
  providedIn: 'root'
})
export class DeliveryInformationService {

  constructor(private httpClient: HttpClient) { }

  loadDeliveryInformation(token:string): Observable<Result<DeliveryInformaionResponse[]>> {
    const url = `${REST_API_SERVER}` + 'delivery-information';
    return this.httpClient.get<Result<DeliveryInformaionResponse[]>>(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ` + token,
      }),
    });
  }

  createDeliveryInformation(token:string, receiverName:string, receiverPhoneNumber:string, receiveAddress:string):Observable<Result<DeliveryInformaionResponse[]>> {
    const url = `${REST_API_SERVER}` + 'delivery-information';
    return this.httpClient.post<Result<DeliveryInformaionResponse[]>>(url, {'receiver_name': receiverName, 'receiver_phone_number': receiverPhoneNumber, 'delivery_address': receiveAddress}, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ` + token,
      }),
    });
  } 

  deleteDeliveryInformation(token:string, deliveryId:number): Observable<Result<boolean>> {
    const url = `${REST_API_SERVER}` + 'delivery-information/' + deliveryId;
    return this.httpClient.delete<Result<boolean>>(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ` + token,
      }),
    });
  }
}
