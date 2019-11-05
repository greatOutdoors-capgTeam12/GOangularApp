import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { AddProductFormComponent } from './Products/add-product-form/add-product-form.component';
import { ProductsCardComponent } from './Products/products-card/products-card.component';
import { ProductMasterComponent } from './user/ProductMaster/productmaster.component';
import { ConfirmEqualValidatorDirective } from './shared/confirm-equal-password-validator.directive';
import { ProductServiceModule } from './Products/product.service';
import { DisplayproductComponent } from './Products/display-product/displayproduct.component';
import { CreateProductCanDeactivateGuardService } from './Products/create-product-can-deactivate-guard.service';
import { ProductdetailsComponent } from './Products/product-details/productdetails.component';
import { CreateProductMasterCanDeactivateGuardService } from './user/ProductMaster/add-product-master-can-deactivate-guard.service';
import { ProductFilterPipe } from './Products/product-filter.pipe';
import { ProductListResolverService } from './Products/product-list-resolver.service';
import { PageNotFoundComponent } from './page-not-found.component';
import { ProductDetailsGuardService } from './Products/product-details-guard.service';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserLoginServiceModule } from './user/user-login/user.service';
import { LoginComponent } from './user/user-login/login.component';
import { RegisterComponent } from './user/user-register/registration.component';
import { UserRegisterServiceModule } from './user/user-register/register.service';
import { ProductMasterRegisterModule } from './user/ProductMaster/user-service.model';
import { DisplayAddressComponent } from './address/display-address.component';
import { AddressServiceModule } from './address/addres.service';
import { AddAddressComponent } from './address/add-address/add-address.component';
import { AddaddressServiceModule } from './address/add-address/add-address.service';
import { DisplayFavComponent } from './favourites/display-fav/display-fav.component';
import { ProductMasterGuardService } from './shared/product-master-authentication-guard.service';
import { RetailerSalesGuardService } from './shared/retailer-sales-rep-authentication-guard.service';
import { AdminGuardService } from './shared/admin-authentication-guard.service';
import { FavProductService } from './favourites/display-fav/fav.service';
import { LoggedinComponent } from './loggedin/loggedin.component';
import { LoginRegisterGuardService } from './shared/login-registration-authentication-guard.service';
import { ProfileComponent } from './user/profile.component';
import { ReturnOrderComponent } from './order/return-order/return-order.component';
import { ReturnOrderServiceModule } from './order/return-order/returnorder.service';
import { ReturnProductComponent } from './order/return-product/return-product.component';
import { ReturnProductServiceModule } from './order/return-product/returnproduct.service';
import { CancelOrdService } from './order/cancel-order/cancel-ord.service';
import { CancelProdService } from './order/cancel-product/cancel-prod.service';
import { CancelOrderComponent } from './order/cancel-order/cancel-order.component';
import { CancelProductComponent } from './order/cancel-product/cancel-product.component';
import { CartComponent } from './cart/cart.component';
import { PlaceOrderComponent } from './placeorder/place-order.component';
import { PlaceOrderServiceModule } from './placeorder/place-order.service';
import { CartServiceModule } from './cart/cart.service';
import { ReportsModule } from './reports/reports.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    UserLoginFormComponent,
    SearchbarComponent,
    AddProductFormComponent,
    ProductsCardComponent,
    ProductMasterComponent,
    ConfirmEqualValidatorDirective,
    DisplayproductComponent,
    ProductdetailsComponent,
    ProductFilterPipe,
    PageNotFoundComponent,
    LoginComponent,
    RegisterComponent,
    DisplayAddressComponent,
    AddAddressComponent,
    DisplayFavComponent,
    LoggedinComponent,
    ProfileComponent,
    ReturnOrderComponent,
    ReturnProductComponent,
    CancelOrderComponent,
    CancelProductComponent,
    CartComponent,
    PlaceOrderComponent

  ],
  imports: [
    ReportsModule,
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    AngularFontAwesomeModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    
  ],
  providers: [ProductServiceModule,UserLoginServiceModule,UserRegisterServiceModule, CreateProductCanDeactivateGuardService, 
    CreateProductMasterCanDeactivateGuardService,ProductListResolverService,ProductMasterRegisterModule,AddressServiceModule,
  ProductDetailsGuardService, AddaddressServiceModule, ProductMasterGuardService,AdminGuardService,
  RetailerSalesGuardService,FavProductService,LoginRegisterGuardService,ReturnOrderServiceModule,ReturnProductServiceModule,CancelOrdService,CancelProdService,PlaceOrderServiceModule,CartServiceModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
