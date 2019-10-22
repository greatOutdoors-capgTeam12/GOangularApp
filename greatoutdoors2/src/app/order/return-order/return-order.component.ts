import { Component, OnInit, ViewChild } from '@angular/core';

import { NgForm } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ReturnOrderServiceModule } from './returnorder.service';
import { ReturnOrder } from 'src/app/models/returnorder.model';

@Component({
  selector: 'app-return-order',
  templateUrl: './return-order.component.html',
  styleUrls: ['./return-order.component.css']
})
export class ReturnOrderComponent implements OnInit {

  @ViewChild('returnorderform', null) public  returnOrdForm : NgForm;
  returnorder:ReturnOrder={
    userid:null,
    orderid:null,
    reason:null,
  };
  message : string;
    errMsg : string;
    constructor(private _returnorderservice: ReturnOrderServiceModule, private _router: Router,
        private _route: ActivatedRoute, private toasterService : ToastrService) { }
 
  ngOnInit() {

    this.message = "Order return Succesful ";
    this.errMsg = " Error in returning order";
    
  }
returnOrder():void{
    let retord : ReturnOrder = Object.assign({},this.returnorder);
    this._returnorderservice.returnOrder(retord).subscribe(
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
          this.returnOrdForm.reset();
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
          this.returnOrdForm.reset();
          this._router.navigate(['/ReturnOrder']);

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
        this.returnOrdForm.reset();
        this._router.navigate(['/ReturnOrder']);
      }
    );
   
  }

}
