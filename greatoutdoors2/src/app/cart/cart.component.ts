import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CartServiceModule } from './cart.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { cart } from '../models/cart.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {


  @ViewChild('addItemform', null) public  addItemform : NgForm;
  addingItem: cart=
  {
  productId: null,
	userId:null,
	quantity: null,
}

  message : string;
    errMsg : string;
    constructor(private _cartservice: CartServiceModule, private _router: Router,
        private _route: ActivatedRoute, private toasterService : ToastrService) { }
 

        ngOnInit() {

          this.message = "Product is successfully added to cart";
          this.errMsg = " Error in Adding Product";
          
        }
       

       addItem():void{
          let addingToCart : cart = Object.assign({},this.addingItem);
          this._cartservice.addItem(addingToCart).subscribe(
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
                this.addItemform.reset();
                this._router.navigate([' ']);
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
                this.addItemform.reset();
                this._router.navigate(['/login']);
      
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
              this.addItemform.reset();
              this._router.navigate(['/login']);
            }
          );
         
        }
      }

