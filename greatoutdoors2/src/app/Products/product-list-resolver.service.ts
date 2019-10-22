import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';
import { ProductServiceModule } from './product.service';
import { Injectable, Input } from '@angular/core';

@Injectable()
export  class ProductListResolverService implements  Resolve<Product[]>
{
    @Input()
     _prodcat : number = 0;

    set prodcat(val : number)
    {
        this._prodcat = val;
    }

    get prodcat() : number
    {
        return this._prodcat;
    }

    constructor(private _productservice : ProductServiceModule)
    {

    }
    resolve( route : ActivatedRouteSnapshot, state : RouterStateSnapshot) : Observable<Product[]>
    {
        return this._productservice.getProductsByCategory(this._prodcat);
    }

   

} 