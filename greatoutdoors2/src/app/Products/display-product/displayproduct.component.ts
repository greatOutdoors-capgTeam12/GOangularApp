import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-displayproduct',
  templateUrl: './displayproduct.component.html',
  styleUrls: ['./displayproduct.component.css']
})
export class DisplayproductComponent implements OnInit {
  private _product: Product;
  
  @Input()
  set product(val : Product)
  {
    this._product = val;
  }

  get product() : Product{

    return this._product;
  }
  constructor() { }

  ngOnInit() {
    
  }

  nextProduct() : void {

  }


}
