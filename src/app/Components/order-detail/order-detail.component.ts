import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonUtils } from 'src/app/Common/CommonUtils';
import { OrderResponse } from 'src/app/Models/Response/OrderResponse';
import { Result } from 'src/app/Models/Result';
import { CookiesService } from 'src/app/Services/cookies.service';
import { OrderService } from 'src/app/Services/order.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  public orderId = 0;
  public order!: OrderResponse;

  constructor(
    private acitvatedRoute: ActivatedRoute,
    private cookieService: CookiesService,
    private orderService: OrderService,
    private commonUtils: CommonUtils
  ) { }

  ngOnInit(): void {
    this.acitvatedRoute.paramMap.subscribe(param => {
      this.orderId = +param.get('id')!;
    })
    this.getOrderDetailById(this.orderId);
  }

  getOrderDetailById(id:number) {
    const token = this.cookieService.getCookie('token');
    this.orderService.getOrderDetailById(token, id).subscribe(data => {
      const response = this.commonUtils.keysToCamel(data) as Result<OrderResponse>;
      this.order = response.content;
    })
  }

  reorder() {
    const token = this.cookieService.getCookie('token');
    this.orderService.reOrder(token, this.order.orderId).subscribe(data => {
      const response = this.commonUtils.keysToCamel(data) as Result<boolean>;
      if(response.content === true) {
        alert('Tất cả sản phẩm của đơn hàng này đã được thêm vào giỏ hàng thành công.');
      }
    })
  }

  cancelOrder() {
    if(confirm('Bạn có chắc muốn hủy đơn hàng #' + this.order.orderId + ' không?')) {
      const token = this.cookieService.getCookie('token');
      this.orderService.cancelOrder(token, this.order.orderId).subscribe(data => {
        const response = this.commonUtils.keysToCamel(data) as Result<boolean>;
        if(response.content === true) {
          window.location.reload();
        }
      })
    }
  }
}
