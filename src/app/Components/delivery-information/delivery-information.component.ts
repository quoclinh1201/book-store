import { Component, OnInit } from '@angular/core';
import { CommonUtils } from 'src/app/Common/CommonUtils';
import { DeliveryInformaionResponse } from 'src/app/Models/Response/DeliveryInformaionResponse';
import { Result } from 'src/app/Models/Result';
import { CookiesService } from 'src/app/Services/cookies.service';
import { DeliveryInformationService } from 'src/app/Services/delivery-information.service';

@Component({
  selector: 'app-delivery-information',
  templateUrl: './delivery-information.component.html',
  styleUrls: ['./delivery-information.component.css'],
})
export class DeliveryInformationComponent implements OnInit {
  public listDeliveryInformation:DeliveryInformaionResponse[] = [];

  constructor(
    private cookieService: CookiesService,
    private deliveryInformationService: DeliveryInformationService,
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

  deleteDelivery(id:number) {
    if(confirm('Bạn có chắc muốn xóa thông tin giao hàng này không?')) {
      const token = this.cookieService.getCookie('token');
      this.deliveryInformationService.deleteDeliveryInformation(token, id).subscribe(data => {
        const response = this.commonUtils.keysToCamel(data) as Result<boolean>;
        if(response.content === true) {
          window.location.reload();
        }
      })
    }
  }
}
