import { Component, OnInit, Injectable, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductServiceModule } from '../product.service';
import { Product } from 'src/app/models/product.model';


@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css']
})
@Injectable()
export class ProductdetailsComponent implements OnInit {
  private _id : String;
  product : Product;
  private _products : Product[];
  private arrayIndex : number;
  private stats : number =0;
  @Input()
  private _prodcat : number = 0;

  set prodcat(val : number)
  {
    this._prodcat = val;
  }

  get prodcat() : number
{
   return this._prodcat;
}
  constructor(private _route : ActivatedRoute, private _productservice : ProductServiceModule,
    private _router : Router) { 
  }

  ngOnInit() {

    this._productservice.getProductsByCategory(this._prodcat).subscribe(prodList => {this._products = prodList as Product[]});
    this._route.paramMap.subscribe(params => {this._id=params.get('prodid');
    this.product= this._productservice.getProductsById(this._id);
    
    
    
  });
    
   

  }

  viewNextProduct()
  {
    if(this.stats === 0)
    {
      this.arrayIndex = this._products.findIndex(p => p.prodid === this._id);
      this.stats = 1;
    }
    if(this.arrayIndex < this._products.length-1){
    this.arrayIndex = this.arrayIndex + 1;
    this._id = this._products[this.arrayIndex].prodid;
    }
    else
    {
      this.arrayIndex = 0;
      this._id = this._products[this.arrayIndex].prodid;
    }
    this._router.navigate(['/Products', this._id],
    {
      queryParamsHandling : 'preserve'
    });
  }

  viewPreviousProduct()
  {
    if(this.stats === 0)
    {
      this.arrayIndex = this._products.findIndex(p => p.prodid === this._id);
      this.stats = 1;
    }
    if(this.arrayIndex > 0){
    this.arrayIndex = this.arrayIndex - 1;
    this._id = this._products[this.arrayIndex].prodid;
    }
    else
    {
      this.arrayIndex = this._products.length - 1;
      this._id = this._products[this.arrayIndex].prodid;
    }
    this._router.navigate(['/Products', this._id],
    {
      queryParamsHandling : 'preserve'
    });
  }


 

}
