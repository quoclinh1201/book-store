import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CommonUtils } from 'src/app/Common/CommonUtils';
import { CartItemResponse } from 'src/app/Models/Response/CartItemResponse';
import { CartResponse } from 'src/app/Models/Response/CartResponse';
import { Result } from 'src/app/Models/Result';
import { CartService } from 'src/app/Services/cart.service';
import { CookiesService } from 'src/app/Services/cookies.service';
import { OrderService } from 'src/app/Services/order.service';
import { CheckoutComponent } from '../checkout/checkout.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  @ViewChild(CheckoutComponent) child!: CheckoutComponent;
  public quantityOfProduct = 1;
  public cartItems: CartItemResponse[] = [];
  public totalPrice = '';
  public requireChooseDelivery = '';
  public requireChoosePayment = '';
  public createOrderError = '';

  constructor(
    private cookieService: CookiesService,
    private cartService: CartService,
    private orderService: OrderService,
    private commonUtils: CommonUtils,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {
    const token = this.cookieService.getCookie('token');
    this.cartService.loadCart(token).subscribe((data) => {
      const response = this.commonUtils.keysToCamel(
        data
      ) as Result<CartResponse>;
      this.cartItems = response.content.cartItems;
      this.totalPrice = response.content.totalPrice;
    });
  }

  decreaseValue(productId: number) {
    if (this.cartItems.find((c) => c.productId == productId)!.quantity > 1) {
      const token = this.cookieService.getCookie('token');
      this.cartService.decreaseProduct(token, productId).subscribe((data) => {
        const response = this.commonUtils.keysToCamel(
          data
        ) as Result<CartResponse>;
        this.cartItems = response.content.cartItems;
        this.totalPrice = response.content.totalPrice;
      });
    }
  }

  increaseValue(productId: number) {
    const token = this.cookieService.getCookie('token');
    this.cartService.increaseProduct(token, productId).subscribe((data) => {
      const response = this.commonUtils.keysToCamel(
        data
      ) as Result<CartResponse>;
      this.cartItems = response.content.cartItems;
      this.totalPrice = response.content.totalPrice;
    });
  }

  removeProduct(productId: number, productName: string) {
    if (confirm('Bạn có chắc muốn xóa ' + productName + ' không?')) {
      const token = this.cookieService.getCookie('token');
      this.cartService.removeProduct(token, productId).subscribe((data) => {
        const response = this.commonUtils.keysToCamel(
          data
        ) as Result<CartResponse>;
        this.cartItems = response.content.cartItems;
        this.totalPrice = response.content.totalPrice;
      });
    }
  }

  checkout() {
    if (this.child.selectedDelivery === undefined) {
      this.requireChooseDelivery = 'Vui lòng chọn thông tin nhận hàng';
    } else this.requireChooseDelivery = '';

    if (this.child.paymentMethod === '') {
      this.requireChoosePayment = 'Vui lòng chọn phương thức thanh toán';
    } else this.requireChoosePayment = '';

    if (
      this.child.selectedDelivery !== undefined &&
      this.child.paymentMethod !== ''
    ) {
      const token = this.cookieService.getCookie('token');
      this.orderService.createOrder(token, this.child.paymentMethod, this.child.selectedDelivery.deliveryId)
        .subscribe(data => {
          const response = this.commonUtils.keysToCamel(data) as Result<number>;
          this.router.navigate(['order-detail/' + response.content]);
        }, err => {
          this.createOrderError = err.error.error.message;
          alert(this.createOrderError);
        });
    }
  }
}
