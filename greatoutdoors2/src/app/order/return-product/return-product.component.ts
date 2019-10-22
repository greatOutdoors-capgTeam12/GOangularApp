
import { Component, OnInit, ViewChild, Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ReturnProductServiceModule } from './returnproduct.service';
import { ReturnProduct } from 'src/app/models/returnproduct.model';


@Component({
  selector: 'app-return-product',
  templateUrl: './return-product.component.html',
  styleUrls: ['./return-product.component.css']
})
export class ReturnProductComponent implements OnInit {

  @ViewChild('returnproductform', null) public  returnProdForm : NgForm;
  returnproduct: ReturnProduct =
  {
    userid:null,
    prodid :null,
    orderid:null,
    prodqty:null,
    reason:null,
  }

  message : string;
    errMsg : string;
    constructor(private _returnproductservice: ReturnProductServiceModule, private _router: Router,
        private _route: ActivatedRoute, private toasterService : ToastrService) { }
 
  ngOnInit() {

    this.message = "Product return Succesful ";
    this.errMsg = " Error in returning product";
    
  }
returnprod():void{
    let retprod : ReturnProduct = Object.assign({},this.returnproduct);
    this._returnproductservice.returnprod(retprod).subscribe(
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
          this.returnProdForm.reset();
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
          this.returnProdForm.reset();
          this._router.navigate(['/ReturnProduct']);

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
        this.returnProdForm.reset();
        this._router.navigate(['/ReturnProduct']);
      }
    );
   
  }
}
