import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators, NgModel } from '@angular/forms';
import { ProductServiceModule } from '../product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-product-form',
  templateUrl: './add-product-form.component.html',
  styleUrls: ['./add-product-form.component.css']
})
export class AddProductFormComponent implements OnInit {

  @ViewChild('addproductform', null) public addProdform: NgForm;
  @ViewChild('addprodid', null) public addProdId: NgModel;

  product: Product =
    {
      prodid: null,
      prodName: null,
      prodBrand: null,
      prodSpec: null,
      prodDim: null,
      prodQty: null,
      prodPrice: null,
      prodColor: null,
      category: null,
      isActive: null,
      photoPath: null,
    }
  localUrl: string;
  productHeading: string;
  updateMessage: string;
  submitText: string;
  not_editable: boolean;
  message: string;
  prodid: string;
  errMsg: string;
  constructor(private _productservice: ProductServiceModule, private _router: Router,
    private _route: ActivatedRoute, private toasterService: ToastrService) { }

  ngOnInit() {

    this._route.paramMap.subscribe(parameterMap => {
      this.prodid = parameterMap.get('prodid');
      this.getProd(this.prodid)
    });

  }

  private getProd(id: string) {
    if (id === '0') {
      this.product =
        {
          prodid: null,
          prodName: null,
          prodBrand: null,
          prodSpec: null,
          prodDim: null,
          prodQty: null,
          prodPrice: null,
          prodColor: null,
          category: null,
          isActive: null,
          photoPath: null,
        };
      this.addProdform.reset();
      this.productHeading = "Add Product Form";
      this.updateMessage = "";
      this.submitText = "Add Product";
      this.not_editable = false;
      this.message = 'Product Added Succesfully';
      this.errMsg = 'Error in adding Product';
    }
    else {
      // this.product = Object.assign({}, this._productservice.getProductsById(id));
      this._productservice.getProductById().subscribe(
        (prodList: any) => {
          let _productsList = prodList as Product[];
          this.product = _productsList.find(p => p.prodid === id);
        }
      );
      /*
      
      */
      this.productHeading = "Update Product Form";
      this.updateMessage = " (It is necessary to upload the image again, In quantity field enter the quantity you want to add to the existing quantity )";
      this.submitText = "Update Product";
      this.not_editable = true;
      this.message = 'Product Updated Succesfully';
      this.errMsg = 'Error in Updating Product';

    }
  }

  isDisabled(): boolean {
    return this.not_editable;
  }

  showPreviewImage(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.localUrl = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  saveProduct(): void {
    this.product.photoPath = this.localUrl;
    let prod = Object.assign({}, this.product);
    this._productservice.saveProduct(prod, this.prodid).subscribe(
      data => {
        if (JSON.stringify(data).indexOf("Success") >= 0) {

          this.toasterService.success(
            JSON.stringify(data),
            this.message,
            {
              timeOut: 8000,
              closeButton: true,
              progressBar: true,
            })
          this.addProdform.reset();
          this._router.navigate(['Product/allproducts']);
        }
        else {

          this.toasterService.error(
            JSON.stringify(data),
            this.errMsg,
            {
              timeOut: 8000,
              closeButton: true,
              progressBar: true,
            })
          this.addProdform.reset();
          this._router.navigate(['Product/allproducts']);

        }
      },
      error => {
        console.log("Error :" + JSON.stringify(error));
        this.toasterService.warning(
          JSON.stringify(error),
          this.errMsg,
          {
            timeOut: 8000,
            closeButton: true,
            progressBar: true,
          })
        this.addProdform.reset();
        this._router.navigate(['Product/allproducts']);
      }
    );;


  }

}
