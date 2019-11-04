import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductMasterRegisterModule } from './user-service.model';

@Component({
  selector: 'app-productmaster',
  templateUrl: './productmaster.component.html',
  styleUrls: ['./productmaster.component.css']
})
export class ProductMasterComponent implements OnInit {
 
  @ViewChild('productmasterform', null) public  prodMastRegForm : NgForm;
  newUser: User =
  {
      userId : null,
      userName : null,
      userMail : null,
      userPassword : null,
      userNumber : null,
      userCategory : null,
      userActiveStatus : null,
  }
  message : string;
    errMsg : string;
    constructor(private _registerservice: ProductMasterRegisterModule, private _router: Router,
        private _route: ActivatedRoute, private toasterService : ToastrService) { }
 
  ngOnInit() {
    this.message = "User Registration Succesful ";
    this.errMsg = " Error in Registering";
  }
  registerUser():void{
    let regUser : User = Object.assign({},this.newUser);
    this._registerservice.registerUser(regUser).subscribe(
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
          this.prodMastRegForm.reset();
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
          this.prodMastRegForm.reset();
          this._router.navigate(['/Admin/createproductmaster']);

        }
      },
      error => {
        console.log("Error :" + JSON.stringify(error));
        this.toasterService.error(
          JSON.stringify(error),
          this.errMsg,
          {
            timeOut: 8000,
            closeButton: true,
            progressBar: true,
          })
        this.prodMastRegForm.reset();
        this._router.navigate(['/Admin/createproductmaster']);
      }
    );
   
  }
}
