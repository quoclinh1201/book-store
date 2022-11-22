import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CommonUtils } from 'src/app/Common/CommonUtils';
import { CategoryResponse } from 'src/app/Models/Response/CategoryResponse';
import { Result } from 'src/app/Models/Result';
import { CategoriesService } from 'src/app/Services/categories.service';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  @Output() public searchProduct = new EventEmitter<{page: number, searchValue: string, category: string}>();
  
  public categories: CategoryResponse[] = [];
  public searchValue = '';
  public category = '';

  constructor(
    private categoriService: CategoriesService,
    private commonUtils: CommonUtils
  ) {}

  ngOnInit(): void {
    this.getCategories();
  }

  public getCategories() {
    this.categoriService
      .getAllCategories()
      .subscribe((data: Result<CategoryResponse[]>) => {
        const result = this.commonUtils.keysToCamel(data) as Result<
          CategoryResponse[]
        >;
        this.categories = result.content;
      });
  }

  public getSelectedCategory(event: any) {
    if (event.target.value !== 'Tất cả thể loại') {
      this.category = event.target.value;
    }
  }

  public searchProducts() {
    this.searchProduct.emit({page: 1, searchValue: this.searchValue, category:this.category});
  }
}
