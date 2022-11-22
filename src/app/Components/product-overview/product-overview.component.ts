import { Component, Input, OnInit } from '@angular/core';
import { ProductImageResponse } from 'src/app/Models/Response/ProductImageResponse';
import { ProductResponse } from 'src/app/Models/Response/ProductResponse';
import { CartService } from 'src/app/Services/cart.service';
import { CookiesService } from 'src/app/Services/cookies.service';

@Component({
  selector: 'app-product-overview',
  templateUrl: './product-overview.component.html',
  styleUrls: ['./product-overview.component.css'],
})
export class ProductOverviewComponent implements OnInit {
  @Input() product!: ProductResponse;
  @Input() images!: ProductImageResponse[];

  public quantityOfProduct = 1;
  public currentImg = '';
  public isLogedIn = false;

  constructor(private cookieService:CookiesService, private cartService:CartService) {}

  ngOnInit(): void {
    if(this.cookieService.getCookie('token') !== '') {
      this.isLogedIn = true;
    }
    else {
      this.isLogedIn = false;
    }
  }

  decreaseValue() {
    if (this.quantityOfProduct > 1) this.quantityOfProduct--;
  }

  increaseValue() {
    this.quantityOfProduct++;
  }

  addToCart() {
    const token = this.cookieService.getCookie('token');
    this.cartService.addToCart(token, this.product.productId, this.quantityOfProduct).subscribe(data => {
      alert('Thêm vào giỏ hàng thành công');
      this.quantityOfProduct = 1;
    });
  }
}
