import { Component, Input, OnInit } from '@angular/core';
import { DeliveryInformaionResponse } from 'src/app/Models/Response/DeliveryInformaionResponse';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  @Input() requireChooseDelivery!:string;
  @Input() requireChoosePayment!:string;

  public selectedDelivery!:DeliveryInformaionResponse;
  public paymentMethod = '';

  constructor() { }

  ngOnInit(): void {
  }

  selectDelivery(delivery:DeliveryInformaionResponse) {
    this.selectedDelivery = delivery;
  }
}
