import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CancelOrderModel } from 'src/app/models/cancelOrder.model';
import { ToastrService } from 'ngx-toastr';
import { CancelOrdService } from './cancel-ord.service'

@Component({
  selector: 'app-cancel-order',
  templateUrl: './cancel-order.component.html',
  styleUrls: ['./cancel-order.component.css']
})
export class CancelOrderComponent implements OnInit {

  @ViewChild('cancelorderform', null) public cancelOrdForm: NgForm;

  cancelOrder: CancelOrderModel = {
    userId: null,
    orderId: null
  }

  message: string;
  errMsg: string;
  heading: string = 'Cancel Order';
  orders: Object;

  constructor(private cancelOrdSer: CancelOrdService, private _router: Router,
    private _route: ActivatedRoute, private toasterService: ToastrService) { }

  ngOnInit() {
    this.message = "Cancel Order Succesful ";
    this.errMsg = " Error in Cancelling Order";
  }

  alertMessage() {
    window.alert('Your data is sent and is being processed');
  }

  getOrderCancel(): void {
    let cancelOrderMod: CancelOrderModel = Object.assign({}, this.cancelOrder);
    this.cancelOrdSer.getOrderCancel(cancelOrderMod).subscribe(
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
          this.cancelOrdForm.reset();
          this._router.navigate(['/cancelOrder']);
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
          this.cancelOrdForm.reset();
          this._router.navigate(['/cancelOrder']);

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
        this.cancelOrdForm.reset();
        this._router.navigate(['/cancelOrder']);
      }
    );

  }

}

