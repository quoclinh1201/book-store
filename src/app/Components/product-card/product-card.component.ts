import { Component, Input, OnInit } from '@angular/core';
import { GetListProductResponse } from 'src/app/Models/Response/GetListProductResponse';
import { CartService } from 'src/app/Services/cart.service';
import { CookiesService } from 'src/app/Services/cookies.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
  @Input() product!: GetListProductResponse;
  @Input() isLogedIn!: boolean;

  constructor(
    private cookieService: CookiesService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {}

  addToCart(productId: number) {
    const token = this.cookieService.getCookie('token');
    this.cartService.addToCart(token, productId, 1).subscribe(data => {
      alert('Thêm sản phẩm vào giỏ hàng thành công')
    });
  }
}
