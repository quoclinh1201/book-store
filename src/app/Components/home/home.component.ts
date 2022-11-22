import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonUtils } from 'src/app/Common/CommonUtils';
import { PagedResult } from 'src/app/Models/PagedResult';
import { GetListProductResponse } from 'src/app/Models/Response/GetListProductResponse';
import { ProductService } from 'src/app/Services/product.service';
import { EventEmitter } from '@angular/core';
import { CookiesService } from 'src/app/Services/cookies.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  // public getListProductsResponse!: PagedResult<GetListProductResponse>;
  public listProducts: GetListProductResponse[] = [];
  public searchValue = '';
  public catogoryValue = '';
  public pageNumber = 1;
  public pageList: number[] = [];
  public isPrevious = false;
  public isNext = false;
  public isLogedIn = false;
  private url = '';

  constructor(
    private acitvatedRoute: ActivatedRoute,
    private productService: ProductService,
    private commonUtils: CommonUtils,
    private cookieService: CookiesService
  ) {}

  ngOnInit(): void {
    this.acitvatedRoute.queryParams.subscribe((params) => {
      this.searchValue = params['productName'];
      this.catogoryValue = params['categoryName'];
      this.pageNumber = params['pageNumber'] ? +params['pageNumber'] : 1;
    });
    this.getListProduct(1, '', '');
  }

  public getListProduct(page: number, searchValue: string, category: string) {
    
    this.url = '?';
    this.searchValue = searchValue !== undefined ? searchValue : '';
    this.url += 'ProductName=' + this.searchValue + '&';

    this.catogoryValue !== undefined ? category : '';
    this.url += 'CategoryName=' + category + '&';
    if (!Number.isNaN(this.pageNumber)) {
      this.url += 'PageNumber=' + page;
      this.pageNumber = page;
    }
    this.productService.getListProduct(this.url).subscribe((data) => {
      const response = this.commonUtils.keysToCamel(
        data
      ) as PagedResult<GetListProductResponse>;

      this.listProducts = response.content;
      this.pageList = Array(response.totalPages);
      this.isPrevious = response.hasPrevious;
      this.isNext = response.hasNext;
    });
    this.checkLogin();
  }

  checkLogin() {
    if(this.cookieService.getCookie('token') !== '') {
      this.isLogedIn = true;
    }
    else {
      this.isLogedIn = false;
    }
  }
}
