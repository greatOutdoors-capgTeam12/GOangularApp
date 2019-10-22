import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductServiceModule } from '../product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserLoginServiceModule } from 'src/app/user/user-login/user.service';

@Component({
  selector: 'app-products-card',
  templateUrl: './products-card.component.html',
  styleUrls: ['./products-card.component.css']
})
export class ProductsCardComponent implements OnInit {

  products: Array<Product> = [];
  filteredProducts: Product[];
  productToDisplay: Product;
  private arrayIndex = 1;
  private _searchTerm: string;
  private _brandTerm: string;
  private _lowpriceTerm: string = '0';
  private _highpriceTerm: string = '100000000';
  private _prodcat: number = 0;
  private _filterbarviewstats: boolean = false;
  private message: string;
  private errMsg: string;
  loggedUser: any = null;
  user_role: any = null;
  user_id: any = null;
  errFavMsg: string;
  favmessage: string;

  get searchTerm(): string {
    return this._searchTerm;

  }

  set searchTerm(val: string) {
    this._searchTerm = val;
    this.filteredProducts = this.filteredProduct(val, this._brandTerm, this._lowpriceTerm, this._highpriceTerm);
  }

  get brandTerm(): string {
    return this._brandTerm;

  }

  set brandTerm(val: string) {
    this._brandTerm = val;
    this.filteredProducts = this.filteredProduct(this._searchTerm, val, this._lowpriceTerm, this._highpriceTerm);
  }

  get lowpriceTerm(): string {
    return this._lowpriceTerm;

  }

  set lowpriceTerm(val: string) {
    this._lowpriceTerm = val;
    this.filteredProducts = this.filteredProduct(this._searchTerm, this._brandTerm, val, this._highpriceTerm);
  }


  set highpriceTerm(val: string) {
    this._highpriceTerm = val;
    this.filteredProducts = this.filteredProduct(this._searchTerm, this._brandTerm, this._lowpriceTerm, val);
  }
  get highpriceTerm(): string {
    return this._highpriceTerm;

  }

  constructor(private _router: Router,
    private _route: ActivatedRoute,
    private _productservice: ProductServiceModule, private toastrService: ToastrService, ) {

    try {
      this.products = this._route.snapshot.data['productList'];
      this.filteredProducts = this.products;
      this.productToDisplay = this.filteredProducts[0];
      if (this._route.snapshot.queryParamMap.has('searchTerm')) {
        this.searchTerm = this._route.snapshot.queryParamMap.get('searchTerm')
      }
      else {
        this.filteredProducts = this.products;
      }
    } catch (error) {
      console.log('Continue with prblem. ' + JSON.stringify(error));
    }
  }

  ngOnInit() {
    this.message = "Product Deleted Successfully";
    this.errMsg = "Error in Deleting Product";
    this.favmessage = "Product added to your wishlist successfully"
    this.errFavMsg = "This product is already in your wishlist"
    if (localStorage.length > 0) {

      this.loggedUser = JSON.stringify(localStorage.getItem('currentUser'));
      this.user_role = +JSON.parse(localStorage.getItem('currentUser'))["userCategory"];
      this.user_id = JSON.parse(localStorage.getItem('currentUser'))["userId"];
    }
    else {
      UserLoginServiceModule.loginEventEmitter.subscribe((data) => {
        this.loggedUser = data;
        this.user_role = +JSON.parse(data)["userCategory"];
        this.user_id = JSON.parse(localStorage.getItem('currentUser'))["userId"];

      });
    }

  }



  filteredProduct(search: string, brand: string, lowprice: string, highprice: string) {

    if ((!this.brandTerm && !this.searchTerm && !this.highpriceTerm
    ) || (!this.brandTerm && !this.searchTerm && !this.lowpriceTerm && !this.highpriceTerm)) {
      return this.products;
    }
    if (!this.brandTerm && !this.searchTerm) {
      return this.products.filter(product =>

        product.prodPrice >= +lowprice && product.prodPrice <= +highprice);
    }
    if (!this.brandTerm) {
      return this.products.filter(product =>
        product.prodName.toLowerCase().indexOf(search.toLowerCase()) !== -1
        && product.prodPrice >= +lowprice && product.prodPrice <= +highprice);
    }
    if (!this.searchTerm) {
      return this.products.filter(product =>
        product.prodBrand.toLowerCase().indexOf(brand.toLowerCase()) !== -1
        && product.prodPrice >= +lowprice && product.prodPrice <= +highprice);
    }
    return this.products.filter(product =>
      product.prodName.toLowerCase().indexOf(search.toLowerCase()) !== -1
      && product.prodBrand.toLowerCase().indexOf(brand.toLowerCase()) !== -1
      && product.prodPrice >= +lowprice && product.prodPrice <= +highprice);

  }




  nextProduct(): void {
    if (this.arrayIndex < this.products.length) {
      this.productToDisplay = this.products[this.arrayIndex];
      this.arrayIndex++;
    }
    else {
      this.productToDisplay = this.products[0];
      this.arrayIndex = 1;
    }
  }

  viewProduct(productId: string) {
    this._router.navigate(['/Products', productId],
      {
        queryParams: { 'searchTerm': this.searchTerm, 'testParam': 'testValue' }
      });
  }

  editProduct(productId: string) {
    this._router.navigate(['Product/editcreateproduct', productId]);
  }


  viewLarge(): void {
    document.getElementById('next-btn').style.display = 'block';
    document.getElementById('product-display').style.display = 'block';
    document.getElementById('product-catalog').style.display = 'none';

  }
  viewSmall(): void {
    document.getElementById('next-btn').style.display = 'none';
    document.getElementById('product-display').style.display = 'none';
    document.getElementById('product-catalog').style.display = 'block';

  }

  filter(): void {
    if (this._filterbarviewstats === false) {
      document.getElementById('filterbar').style.display = 'block';
      this._filterbarviewstats = true;
      this._brandTerm = "";
      this._lowpriceTerm = '0';
      this._highpriceTerm = "100000000";
    }

    else {
      document.getElementById('filterbar').style.display = 'none';
      this._filterbarviewstats = false;
    }
  }

  deleteProduct(id: string) {
    this._productservice.deleteProduct(id).subscribe(
      data => {
        if (JSON.stringify(data).indexOf("Success") >= 0) {

          this.toastrService.success(
            JSON.stringify(data),
            this.message,
            {
              timeOut: 8000,
              closeButton: true,
              progressBar: true,
            });
          this._router.navigate(['Product/allproducts']);
        }
        else {

          this.toastrService.error(
            JSON.stringify(data),
            this.errMsg,
            {
              timeOut: 8000,
              closeButton: true,
              progressBar: true,
            });

          this._router.navigate(['Product/allproducts']);

        }
      },
      error => {
        console.log("Error :" + JSON.stringify(error));
        this.toastrService.warning(
          JSON.stringify(error),
          this.errMsg,
          {
            timeOut: 8000,
            closeButton: true,
            progressBar: true,
          });
        this._router.navigate(['Product/allproducts']);
      }
    );;


  }

  addToFav(prodid: string) {

    this._productservice.addToFav(prodid, this.user_id).subscribe(
      data => {
        if (JSON.stringify(data).indexOf("Success") >= 0) {

          this.toastrService.success(
            JSON.stringify(data),
            this.favmessage,
            {
              timeOut: 8000,
              closeButton: true,
              progressBar: true,
            })
        }

        else {

          this.toastrService.error(
            JSON.stringify(data),
            this.errFavMsg,
            {
              timeOut: 8000,
              closeButton: true,
              progressBar: true,
            })


        }
      },
      error => {
        console.log("Error :" + JSON.stringify(error));
        this.toastrService.warning(
          JSON.stringify(error),
          this.errFavMsg,
          {
            timeOut: 8000,
            closeButton: true,
            progressBar: true,
          })

      }
    );

  }



}

