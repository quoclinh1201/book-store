import { Component, Input, OnInit } from '@angular/core';
import { ProductResponse } from 'src/app/Models/Response/ProductResponse';

@Component({
  selector: 'app-product-information',
  templateUrl: './product-information.component.html',
  styleUrls: ['./product-information.component.css']
})
export class ProductInformationComponent implements OnInit {
  @Input() product!: ProductResponse;

  constructor() { }

  ngOnInit(): void {
  }

}
