import { Component, OnInit, ViewChild, Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AddaddressServiceModule } from './add-address.service';
import { Address } from 'src/app/models/address.model';
import { UserLoginServiceModule } from 'src/app/user/user-login/user.service';
import { AddressServiceModule } from '../addres.service';



@Component({
  selector: 'app-manageaddress-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.css']
})
export class AddAddressComponent implements OnInit {

  @ViewChild('addaddressform', null) public addaddress: NgForm;

  userid: string;
  addid: string;
  addretaddress: Address;

  heading: string;
  submit: string;
  message: string;
  errMsg: string;
  constructor(private _addaddressservice: AddaddressServiceModule, private _router: Router,
    private _route: ActivatedRoute, private toasterService: ToastrService,
    private addressService: AddressServiceModule) { }

  ngOnInit() {
    

    if (localStorage.length > 0) {
      this.userid = JSON.parse(localStorage.getItem('currentUser'))["userId"];
    } else {
      UserLoginServiceModule.loginEventEmitter.subscribe((data) => {
        this.userid = JSON.parse(data)["userId"];
      });
    }

    this._route.paramMap.subscribe(parameterMap => {
      this.addid = parameterMap.get('addressId');
      this.getAddress(this.addid)
    });
  }

  getAddress(addressId: string) {
    if (addressId === "0") {
      this.addretaddress =
        {
          addressId: null,
          building_number: null,
          city: null,
          state: null,
          zip: null,
          country: null,
          address_status: null
        };
      this.message = "Address added successfully ";
      this.errMsg = " Error in adding address";
      this.heading = " Add Address Form";
      this.submit = " Add Address";
    }
    else {
      //let retadd: Address = Object.assign({}, this.addretaddress);
      this.addressService.viewAddress(this.userid).subscribe(
        (addList: Address[]) => {

          addList.forEach((add: Address) => {

            if (add.addressId === this.addid) {
              this.addretaddress = add;

            }
          });

        }
      );

      this.message = "Address updated successfully ";
      this.errMsg = " Error in updating address";
      this.heading = " Update Address Form";
      this.submit = " Update Address";

    }
  }

  addtoaddress(): void {


    this._addaddressservice.addtoaddress(this.addretaddress, this.userid, this.addid).subscribe(
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
          this.addaddress.reset();
          this._router.navigate(['/Address/view-address']);
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
          this.addaddress.reset();


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
        this.addaddress.reset();

      }
    );

  }





}