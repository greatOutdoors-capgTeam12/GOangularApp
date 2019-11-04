import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { NgForm } from '@angular/forms';
import { UserRegisterServiceModule } from './register.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegisterComponent implements OnInit {
 
  @ViewChild('userRegistrationform', null) public  userRegForm : NgForm;
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
    constructor(private _registerservice: UserRegisterServiceModule, private _router: Router,
        private _route: ActivatedRoute, private toasterService : ToastrService) { }
 
  ngOnInit() {
    this.message = "ProductMaster Registration Succesful ";
    this.errMsg = " Error in Registering";
  }
  registeringUser():void{
    let regUser : User = Object.assign({},this.newUser);
    this._registerservice.loginUser(regUser).subscribe(
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
          this.userRegForm.reset();
          this._router.navigate(['/login']);
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
          this.userRegForm.reset();
          this._router.navigate(['/Product/allproducts']);

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
        this.userRegForm.reset();
        this._router.navigate(['/Product/allproducts']);
      }
    );
   
  }
}
