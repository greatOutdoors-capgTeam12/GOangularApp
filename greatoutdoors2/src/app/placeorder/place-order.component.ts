import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Product } from '../models/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PlaceOrderServiceModule } from './place-order.service';
import { Order } from '../models/Order.model';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css']
})
export class PlaceOrderComponent implements OnInit {
 

  @ViewChild('placeOrderform', null) public  placeOrderform  : NgForm;
  placeOrder: Order =
  {
    userId : null,
    addressId : null,
  }

  message : string;
    errMsg : string;
    constructor(private _placeorderservice: PlaceOrderServiceModule, private _router: Router,
        private _route: ActivatedRoute, private toasterService : ToastrService) { }
 

        ngOnInit() {
          this.message = "Order is successfully placed";
          this.errMsg = " Error in Placing Order";
        }
       

        placeTheOrder():void{
           let placingOrder : Order = Object.assign({},this.placeOrder);
         this._placeorderservice.placeTheOrder(placingOrder).subscribe(
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
                this.placeOrderform.reset();
                this._router.navigate(['']);
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
                this.placeOrderform.reset();
                this._router.navigate(['']);
      
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
              this.placeOrderform.reset();
              this._router.navigate(['']);
            }
          );
         
        }
      }
