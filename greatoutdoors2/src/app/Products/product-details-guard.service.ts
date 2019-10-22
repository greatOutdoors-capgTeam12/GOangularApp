import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { ProductServiceModule } from './product.service';

@Injectable()
export class ProductDetailsGuardService implements CanActivate
{
    constructor(private _productservice : ProductServiceModule,
        private _router: Router)
    {

    }
    canActivate(route : ActivatedRouteSnapshot, state : RouterStateSnapshot) : boolean
    {
      const prodexists = !!this._productservice.getProductsById(route.paramMap.get('prodid'));
      if(prodexists)
      {
          return true;
      }
      else{
          this._router.navigate(['/notFound']);
          return false;
      }

    }
}