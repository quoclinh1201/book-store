import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-overview',
  templateUrl: './product-overview.component.html',
  styleUrls: ['./product-overview.component.css']
})
export class ProductOverviewComponent implements OnInit {
  public quantityOfProduct = 1;

  constructor() { }

  ngOnInit(): void {
  }

  public decreaseValue() {
    if(this.quantityOfProduct > 1)
      this.quantityOfProduct--;
  }

  public increaseValue() {
    this.quantityOfProduct++;
  }
}
