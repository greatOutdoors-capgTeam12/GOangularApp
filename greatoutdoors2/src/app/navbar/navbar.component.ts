import { Component, OnInit } from '@angular/core';
import { ProductListResolverService } from '../Products/product-list-resolver.service';
import { Router } from '@angular/router';
import { UserLoginServiceModule } from '../user/user-login/user.service';
import { combineAll } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  loggedUser: any = null;
  user_role: any = null;
  username : string ;
  userId : string;
  message : string;
  errMsg : string = "Logging Out Error";
  constructor(private _prodListResolver: ProductListResolverService,
     private router: Router, private _userService : UserLoginServiceModule,
     private toasterService : ToastrService) {

  }
  ngOnInit() {

    
    if (localStorage.length > 0) {

      this.loggedUser = JSON.stringify(localStorage.getItem('currentUser'));
      this.user_role = +JSON.parse(localStorage.getItem('currentUser'))["userCategory"];
      this.username = JSON.parse(localStorage.getItem('currentUser'))["userName"];
      this.userId = JSON.parse(localStorage.getItem('currentUser'))["userId"];
      this.message = JSON.parse(localStorage.getItem('currentUser'))["userName"] + "succesfully logged out";
      console.log(JSON.parse(localStorage.getItem('currentUser')));
    }
    else {
      UserLoginServiceModule.loginEventEmitter.subscribe((data) => {
        this.loggedUser = UserLoginServiceModule.loggedINUser;
        this.user_role = +JSON.parse(localStorage.getItem('currentUser'))["userCategory"];
        this.username = JSON.parse(localStorage.getItem('currentUser'))["userName"];
        this.userId = JSON.parse(localStorage.getItem('currentUser'))["userId"];
        this.message = JSON.parse(localStorage.getItem('currentUser'))["userName"] + "succesfully logged out";
        console.log(JSON.parse(localStorage.getItem('currentUser')));
      });
    }
  }


    //JSON.parse(sessionStorage.getItem('currentUser'));


  

  camp() {

    this._prodListResolver.prodcat = 1;
    this.router.navigate(['Product/allproducts/camping-products']);
  }
  golf() {

    this._prodListResolver.prodcat = 2;
    this.router.navigate(['Product/allproducts/golf-products']);
  }
  mount() {
    this._prodListResolver.prodcat = 3;
    this.router.navigate(['Product/allproducts/mountaineering-products']);
  }
  personal() {

    this._prodListResolver.prodcat = 5;
    this.router.navigate(['Product/allproducts/personal-products']);
  }
  outdoor() {

    this._prodListResolver.prodcat = 4;
    this.router.navigate(['Product/allproducts/outdoor-products']);
  }
  allProds() {

    this._prodListResolver.prodcat = 0;
    this.router.navigate(['Product/allproducts']);
  }

  logout(){
    localStorage.clear();
    this._userService.logout(this.userId).subscribe(
      data => {
        if (JSON.stringify(data).indexOf("Success") >= 0) {

          this.toasterService.success(
            "Logout Successfull ",
            this.message,
            {
              timeOut: 3000,
              closeButton: true,
              progressBar: true,
            })
          localStorage.setItem('currentUser', JSON.stringify(data));
          UserLoginServiceModule.loggedINUser = JSON.stringify(localStorage.getItem('currentUser'));
          UserLoginServiceModule.loginEventEmitter.emit(UserLoginServiceModule.loginEventEmitter); 
          this.router.navigate(['/Product/allProducts']);
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
          this.router.navigate(['']);

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
        
        this.router.navigate(['']);
      }
    );

  
    UserLoginServiceModule.loggedINUser = null;
    UserLoginServiceModule.loginEventEmitter.emit(UserLoginServiceModule.loggedINUser);
    this.router.navigate(['/login']);
  }
}
