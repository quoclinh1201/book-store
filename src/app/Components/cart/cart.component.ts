import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
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
