import { Component, OnInit } from '@angular/core';
import { CommonUtils } from 'src/app/Common/CommonUtils';
import { GetListOrderResponse } from 'src/app/Models/Response/GetListOrderResponse';
import { Result } from 'src/app/Models/Result';
import { CookiesService } from 'src/app/Services/cookies.service';
import { OrderService } from 'src/app/Services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  public listOrders: GetListOrderResponse[] = [];

  constructor(
    private cookieService: CookiesService,
    private orderService: OrderService,
    private commonUtils: CommonUtils
  ) {}

  ngOnInit(): void {
    this.loadListOrders();
  }

  loadListOrders() {
    const token = this.cookieService.getCookie('token');
    this.orderService.getListOrders(token).subscribe(data => {
      const response = this.commonUtils.keysToCamel(data) as Result<GetListOrderResponse[]>;
      this.listOrders = response.content
    })
  }

  cancelOrder(id: number) {
    if(confirm('Bạn có chắc muốn xóa đơn hàng #' + id + ' không?')) {
      const token = this.cookieService.getCookie('token');
      this.orderService.cancelOrder(token, id).subscribe(data => {
        const response = this.commonUtils.keysToCamel(data) as Result<boolean>;
        if(response.content === true) {
          window.location.reload();
        }
      })
    }
    
  }
}
