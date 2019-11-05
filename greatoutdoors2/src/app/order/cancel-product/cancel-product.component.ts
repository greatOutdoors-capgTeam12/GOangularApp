import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CancelProductModel } from 'src/app/models/cancelProduct.model';
import { ToastrService } from 'ngx-toastr';
import { CancelProdService } from './cancel-prod.service'

@Component({
  selector: 'app-cancel-product',
  templateUrl: './cancel-product.component.html',
  styleUrls: ['./cancel-product.component.css']
})
export class CancelProductComponent implements OnInit {

  @ViewChild('cancelProductform', null) public cancelProdForm: NgForm;

  cancelProduct: CancelProductModel = {
    userId: null,
    orderId: null,
    productId: null,
    quantity: null
  }

  message: string;
  errMsg: string;
  heading: string = 'Cancel Product';
  products: Object;

  constructor(private cancelProdSer: CancelProdService, private _router: Router,
    private _route: ActivatedRoute, private toasterService: ToastrService) { }

  ngOnInit() {
    this.message = "Cancel Product Succesful ";
    this.errMsg = "Error in Cancelling Product";
  }

  alertMessage() {
    window.alert('Your data is sent and is being processed');
  }

  getProductCancel(): void {
    let cancelProductSr: CancelProductModel = Object.assign({}, this.cancelProduct);
    this.cancelProdSer.getProductCancel(cancelProductSr).subscribe(
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
          this.cancelProdForm.reset();
          this._router.navigate(['/CancelProduct']);
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
          this.cancelProdForm.reset();
          this._router.navigate(['/CancelProduct']);

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
        this.cancelProdForm.reset();
        this._router.navigate(['/CancelProduct']);
      }
    );

  }

}