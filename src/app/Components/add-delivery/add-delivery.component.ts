import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CITIES } from 'src/app/Common/Cities';
import { CommonUtils } from 'src/app/Common/CommonUtils';
import { DeliveryInformaionResponse } from 'src/app/Models/Response/DeliveryInformaionResponse';
import { Result } from 'src/app/Models/Result';
import { CookiesService } from 'src/app/Services/cookies.service';
import { DeliveryInformationService } from 'src/app/Services/delivery-information.service';

@Component({
  selector: 'app-add-delivery',
  templateUrl: './add-delivery.component.html',
  styleUrls: ['./add-delivery.component.css']
})
export class AddDeliveryComponent implements OnInit {
  public receiverName = new FormControl('', [Validators.required, Validators.maxLength(50)]);
  public receiverPhoneNumber = new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0]{1}[0-9]{9}')]);
  public receiveAddress = new FormControl('', [Validators.required, Validators.maxLength(150)]);
  public citiesData = CITIES;
  public city = this.citiesData[0].city;
  public districts:string[] = this.citiesData[0].district;
  public district = this.citiesData[0].district[0];
  public receiverNameErr = '';
  public receiverPhoneNumberErr = '';
  public receiveAddressErr = '';
  public requireCity = '';
  public requireDistrict = '';

  constructor(
    private cookieService: CookiesService,
    private deliveryInformationService: DeliveryInformationService,
    private commonUtils: CommonUtils
  ) { }

  ngOnInit(): void {
  }

  changeCity(event:any) {
    this.city = event.target.value;
    if(!this.city) return;
    const search = this.citiesData.filter(data => data.city === this.city);
    if(search && search.length > 0) {
      this.districts = search[0].district;
      this.district = search[0].district[0];
    }
  }

  changeDistrict(event:any) {
    this.district = event.target.value;
  }

  addAddress() {
    if(!this.receiverName.valid) {
      this.receiverNameErr = 'T??n ng?????i nh???n l?? b???t bu???c v?? kh??ng qu?? 50 k?? t???';
    }
    else {
      this.receiverNameErr = '';
    }
    if(!this.receiverPhoneNumber.valid) {
      this.receiverPhoneNumberErr = 'S??? ??i???n tho???i ph???i ????ng 10 k?? t??? s??? v?? ph???i ????ng ?????nh d???ng 0xxxxxxxxx'
    }
    else {
      this.receiverPhoneNumberErr = '';
    }
    if(this.city === this.citiesData[0].city) {
      this.requireCity = "Vui l??ng ch???n th??nh ph???";
    }
    else {
      this.requireCity = '';
    }
    if(this.district === this.citiesData[0].district[0]) {
      this.requireDistrict = "Vui l??ng ch???n qu???n huy???n"
    }
    else {
      this.requireDistrict = '';
    }
    if(!this.receiveAddress.valid) {
      this.receiveAddressErr = '?????a ch??? c??? th??? l?? b???t bu???c'
    } else {
      this.receiveAddressErr = '';
    }

    if(this.receiverNameErr === '' && this.receiverPhoneNumberErr === '' && this.receiveAddressErr === '' && this.requireCity === '' && this.requireDistrict === '') {
      const token = this.cookieService.getCookie('token');
      this.deliveryInformationService.createDeliveryInformation(token, this.receiverName.value, this.receiverPhoneNumber.value, this.receiveAddress.value + ', ' + this.district + ', ' + this.city)
        .subscribe(data => {
          const response = this.commonUtils.keysToCamel(data) as Result<DeliveryInformaionResponse[]>;
          if(response.isSuccess)
            window.location.reload();
        })
    }
  }
}
