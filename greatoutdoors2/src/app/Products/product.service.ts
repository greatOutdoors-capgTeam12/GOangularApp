import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { Observable, of, throwError, ErrorObserver, } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { filter } from 'minimatch';


@Injectable()
export class ProductServiceModule {

  private _products;
  private _productsList: Product[];
  private _prodLst: Product[];
  constructor(private httpClient: HttpClient, private toastr: ToastrService, 
    private router:Router) {

  }



  ngOnInit() {
    this.getProductsById("prod01");
  }

  getProducts(): Observable<Product[]> {


    return this.httpClient.get<Product[]>('http://localhost:9090/go/rest/products/lists').pipe(catchError(err => this.handleError));


  }

  getProductsByCategory(prodcat: number): Observable<Product[]> {
    if (prodcat === 0) {
      /*const prodObs = of(this.productList);
      return prodObs;*/
      let allProdlist = this.httpClient.get<Product[]>('http://localhost:9090/go/rest/products/lists');
      allProdlist.pipe(catchError((err: any) => { return this.handleError(err) }));
      return allProdlist;

    }
    let prodFlObs :any;
    let allProdlist = this.httpClient.get<Product[]>('http://localhost:9090/go/rest/products/lists');
    prodFlObs = allProdlist.pipe(map((products:Product[])=>{
      const filteredProds = [];
      products.forEach(p=>{
        if(p.category == prodcat){
          filteredProds.push(p);
        }
      });
      return filteredProds;
    }));
    return prodFlObs;
    //const prodFlObs = of(this._products.filter(product => product.category === prodcat));
    //return prodFlObs;
  }

  private handleError(errorResponse: HttpErrorResponse): Observable<never> {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error('Client Side Error :', errorResponse.error.message);
    }
    else {
      console.error('Server Side Error :', errorResponse.error.message);
    }
    return throwError('The Site is Under Maintainence! Please visit us later');

  }

  saveProduct(product: Product, pid: string): Observable<any> {
    if (pid === "0") {

     var res = confirm("Are you sure you want to create this new product ?");
     if(res === true)
     {
      const httpOptions: any = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'POST',
          'Access-Control-Allow-Origin': '*'
        })
      };


      return this.httpClient.post("http://localhost:9090/go/AddProductServlet", {
        "prodid": product.prodid,
        "prodName": product.prodName,
        "prodBrand": product.prodBrand,
        "prodSpec": product.prodSpec,
        "prodDim": product.prodDim,
        "prodQty": product.prodQty.toString(),
        "prodPrice": product.prodPrice.toString(),
        "prodColor": product.prodColor,
        "category": product.category.toString(),
      })
    }
    }
    else {
     var res = confirm("Are you sure you want to update this product ?");
     if(res === true)
     {
      const httpOptions: any = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'POST',
          'Access-Control-Allow-Origin': '*'
        })
      };


      return this.httpClient.post("http://localhost:9090/go/UpdateProductServlet", {
        "prodid": product.prodid,
        "prodName": product.prodName,
        "prodBrand": product.prodBrand,
        "prodSpec": product.prodSpec,
        "prodDim": product.prodDim,
        "prodQty": product.prodQty.toString(),
        "prodPrice": product.prodPrice.toString(),
        "prodColor": product.prodColor,
        "category": product.category.toString(),
      })
    }
    }

  }


  getProductById(): Observable<Product[]> {

    return this.httpClient.get<Product[]>('http://localhost:9090/go/rest/products/lists');

  }


  getProductsById(prodId: String): Product {

    this.httpClient.get<Product[]>('http://localhost:9090/go/rest/products/lists').subscribe(prodList => this._productsList = prodList as Product[]);
    return this._productsList.find(p => p.prodid === prodId);

  }

  deleteProduct(prodid: string) {
   
    var res = confirm("Are you sure you want to delte the product ?");
    if(res === true)
    {
      this.toastr.warning("Warning !", "All the details of this product will be permanently deleted",
      {
        timeOut: 8000,
        closeButton: true,
        progressBar: true,
      });
    return this.httpClient.post("http://localhost:9090/go/DeleteProductServlet", {
      "prodid": prodid,
    })
  }
}
  
   

  addToFav(prodid : string, userid : string)
   {
   
    var res = confirm("Are you sure you want to add this product to your wishlist ?");
    if(res === true)
    {
      return this.httpClient.post("http://localhost:9090/go/AddFreqOrderServlet", {
      "prodid": prodid,
      "userid" : userid,
    });
  }
  


  }


}