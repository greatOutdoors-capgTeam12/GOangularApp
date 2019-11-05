import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsCardComponent } from './Products/products-card/products-card.component';
import { AddProductFormComponent } from './Products/add-product-form/add-product-form.component';
import { ProductdetailsComponent } from './Products/product-details/productdetails.component';
import { ProductListResolverService } from './Products/product-list-resolver.service';
import { PageNotFoundComponent } from './page-not-found.component';
import { ProductDetailsGuardService } from './Products/product-details-guard.service';
import { CreateProductMasterCanDeactivateGuardService } from './user/ProductMaster/add-product-master-can-deactivate-guard.service';
import { CreateProductCanDeactivateGuardService } from './Products/create-product-can-deactivate-guard.service';
import { LoginComponent } from './user/user-login/login.component';
import { RegisterComponent } from './user/user-register/registration.component';
import { ProductMasterComponent } from './user/ProductMaster/productmaster.component';
import { DisplayAddressComponent } from './address/display-address.component';
import { AddAddressComponent } from './address/add-address/add-address.component';
import { DisplayFavComponent } from './favourites/display-fav/display-fav.component';
import { ProductMasterGuardService } from './shared/product-master-authentication-guard.service';
import { AdminGuardService } from './shared/admin-authentication-guard.service';
import { RetailerSalesGuardService } from './shared/retailer-sales-rep-authentication-guard.service';
import { LoggedinComponent } from './loggedin/loggedin.component';
import { LoginRegisterGuardService } from './shared/login-registration-authentication-guard.service';
import { ProfileComponent } from './user/profile.component';
import { ReturnOrderComponent } from './order/return-order/return-order.component';
import { ReturnProductComponent } from './order/return-product/return-product.component';
import { CancelProductComponent } from './order/cancel-product/cancel-product.component';
import { CancelOrderComponent } from './order/cancel-order/cancel-order.component';
import { CartComponent } from './cart/cart.component';
import { PlaceOrderComponent } from './placeorder/place-order.component';
import { ReportsComponent } from './reports/reports.component';


const routes: Routes = [

  { path: 'Products/wishlist', component: DisplayFavComponent ,canActivate : [RetailerSalesGuardService]},
  { path: 'Product/allproducts', component: ProductsCardComponent ,
   resolve : {productList : ProductListResolverService} },
   { path: 'Product/allproducts/:type', component: ProductsCardComponent ,
   resolve : {productList : ProductListResolverService} },
  { path: 'Product/editcreateproduct/:prodid', component: AddProductFormComponent, canDeactivate : [CreateProductCanDeactivateGuardService],
   canActivate :[ProductMasterGuardService] },
  { path: 'Admin/createproductmaster', component: ProductMasterComponent, canDeactivate : [CreateProductMasterCanDeactivateGuardService],
  canActivate :[AdminGuardService]},
  { path: '', component: ProductsCardComponent, resolve : {productList : ProductListResolverService} },
  { path: 'Products/:prodid', component: ProductdetailsComponent,
   canActivate : [ProductDetailsGuardService] },
   { path: 'login', component : LoginComponent ,canActivate : [LoginRegisterGuardService]},
   { path: 'register', component : RegisterComponent, canActivate : [LoginRegisterGuardService]},
  { path: 'not-found', component : PageNotFoundComponent},
  { path: 'Address/view-address', component : DisplayAddressComponent,
  canActivate : [RetailerSalesGuardService]},
  { path: 'Address/view-edit-address/:addressId', component : AddAddressComponent,  canActivate : [RetailerSalesGuardService]},
  { path: 'alreadyloggedin', component : LoggedinComponent},
  { path: 'profile', component : ProfileComponent},
  { path: 'Order/return-order', component : ReturnOrderComponent,  canActivate : [RetailerSalesGuardService]},
  { path: 'Order/return-product', component : ReturnProductComponent,  canActivate : [RetailerSalesGuardService]},
  { path: 'Order/cancel-product', component : CancelProductComponent,  canActivate : [RetailerSalesGuardService]},
  { path: 'Order/cancel-order', component : CancelOrderComponent,  canActivate : [RetailerSalesGuardService]},
  { path: 'Cart', component : CartComponent,  canActivate : [RetailerSalesGuardService]},
  { path: 'Order/place-order', component  : PlaceOrderComponent,  canActivate : [RetailerSalesGuardService]},
  { path: 'reports', loadChildren: () => import(`./reports/reports.module`).then(m => m.ReportsModule) }
];


@NgModule({
  imports: [RouterModule.forRoot(routes,
    { onSameUrlNavigation: 'reload'}),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
