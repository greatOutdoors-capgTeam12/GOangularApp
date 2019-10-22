import { Component, OnInit } from '@angular/core';
import { AddressServiceModule } from './addres.service';

import { UserLoginServiceModule } from '../user/user-login/user.service';
import { Address } from '../models/address.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-display-address',
  templateUrl: './display-address.component.html',
  styleUrls: ['./display-address.component.css']
})
export class DisplayAddressComponent implements OnInit {

  userId : string;
  username : string;
  allAddress : Address[];
  message : string;
  errMsg : string;

  constructor(private addressService : AddressServiceModule, private toastrService : ToastrService
    ,private _router : Router) { }

  ngOnInit() {

    this.message = "Address deleted Successfully";
    this.errMsg = " Error in Deleting Address"

    if (localStorage.length > 0) {

      
      this.userId = JSON.parse(localStorage.getItem('currentUser'))["userId"];
      this.username = JSON.parse(localStorage.getItem('currentUser'))["userName"];
      
    }
    else {
      UserLoginServiceModule.loginEventEmitter.subscribe((data) => {
        this.userId = JSON.parse(data)["userId"];
        
      });
    } 

    this.addressService.viewAddress(this.userId) .subscribe(
      addressList => {
        this.allAddress = addressList as Address[]});     

  }  

  deleteAddress(addId: string) {
    this.addressService.deleteAddress(addId).subscribe(
      data => {
       if(JSON.stringify(data).indexOf("Success") >=0)
        {
        
        this.toastrService.success(
        JSON.stringify(data),
        this.message,
        {
          timeOut : 8000,
          closeButton : true,
          progressBar : true,
        });
        this._router.navigate(['Address/view-address']);
      }
      else
      {
        
        this.toastrService.error(
        JSON.stringify(data),
        this.errMsg,
        {
          timeOut : 8000,
          closeButton : true,
          progressBar : true,
        });

        

      }
      },
      error => {
        console.log("Error :"+JSON.stringify(error));
        this.toastrService.warning(
        JSON.stringify(error) ,
        this.errMsg,
        {
          timeOut : 8000,
          closeButton : true,
          progressBar : true,
        });
        
      }
    );;
    
    
  }

  editAddress(addressId: string) {
    this._router.navigate(['Address/view-edit-address', addressId]);
  }

}
