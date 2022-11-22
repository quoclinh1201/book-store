import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonUtils } from 'src/app/Common/CommonUtils';
import { DeliveryInformaionResponse } from 'src/app/Models/Response/DeliveryInformaionResponse';
import { Result } from 'src/app/Models/Result';
import { CookiesService } from 'src/app/Services/cookies.service';
import { DeliveryInformationService } from 'src/app/Services/delivery-information.service';

@Component({
  selector: 'app-choose-delivery',
  templateUrl: './choose-delivery.component.html',
  styleUrls: ['./choose-delivery.component.css'],
})
export class ChooseDeliveryComponent implements OnInit {
  @Output() public selectDelivery = new EventEmitter<DeliveryInformaionResponse>();

  public listDeliveryInformation: DeliveryInformaionResponse[] = [];
  public selectedDelivery!: DeliveryInformaionResponse;
  public deliveryInformaionId = 0;

  constructor(
    private deliveryInformationService: DeliveryInformationService,
    private cookieService: CookiesService,
    private commonUtils: CommonUtils
  ) {}

  ngOnInit(): void {
    this.loadDeliveryInformation();
  }

  loadDeliveryInformation() {
    const token = this.cookieService.getCookie('token');
    this.deliveryInformationService.loadDeliveryInformation(token).subscribe(data => {
      const response = this.commonUtils.keysToCamel(data) as Result<DeliveryInformaionResponse[]>;
      this.listDeliveryInformation = response.content;
    })
  }

  chooseDelivery() {
    this.selectedDelivery = this.listDeliveryInformation.find(d => d.deliveryId == this.deliveryInformaionId)!;
    this.selectDelivery.emit(this.selectedDelivery);
  }
}
