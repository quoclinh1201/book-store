import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonUtils } from 'src/app/Common/CommonUtils';
import { ProductImageResponse } from 'src/app/Models/Response/ProductImageResponse';
import { ProductResponse } from 'src/app/Models/Response/ProductResponse';
import { Result } from 'src/app/Models/Result';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  public productId: number = 1;
  public product!: ProductResponse;
  public images: ProductImageResponse[] = []; 

  constructor(
    private acitvatedRoute: ActivatedRoute,
    private productService: ProductService,
    private commonUtils: CommonUtils
  ) {}

  ngOnInit(): void {
    this.acitvatedRoute.paramMap.subscribe(param => {
      this.productId = +param.get('id')!;
    })

    this.getProductById(this.productId);
  }

  public getProductById(id: number) {
    this.productService.getProductById(this.productId).subscribe((data:Result<ProductResponse>) => {
      const result = this.commonUtils.keysToCamel(data) as Result<ProductResponse>;
      this.product = result.content;
      this.images = result.content.productImages;
      this.product.productImages = this.images;
    })
  }
}
