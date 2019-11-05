import { Component, OnInit } from '@angular/core';
import { UserLoginServiceModule } from './user-login/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user_role : any;
  username : string ;
  usermail : string;
  userno : string;
  userid : string;
  constructor() { }

  ngOnInit() {

    if (localStorage.length > 0) {

      
      this.user_role = +JSON.parse(localStorage.getItem('currentUser'))["userCategory"];
      if(this.user_role === 1)
      {
          this.user_role = "Admin"
      }
      else if(this.user_role === 2)
      {
        this.user_role = "Sales Representative"
      }
      else if(this.user_role === 3)
      {
        this.user_role = "Retailer"
      }
      else if(this.user_role === 4)
      {
        this.user_role = "Product Master"
      }
     
      this.username= JSON.parse(localStorage.getItem('currentUser'))["userName"];
      this.usermail = JSON.parse(localStorage.getItem('currentUser'))["userMail"];
      this.userno = JSON.parse(localStorage.getItem('currentUser'))["userNumber"];
      this.userid = JSON.parse(localStorage.getItem('currentUser'))["userId"];

    }
    else {
      UserLoginServiceModule.loginEventEmitter.subscribe((data) => {
        
        this.user_role = +JSON.parse(localStorage.getItem('currentUser'))["userCategory"];
      if(this.user_role === 1)
      {
          this.user_role = "Admin"
      }
      else if(this.user_role === 2)
      {
        this.user_role = "Sales Representative"
      }
      else if(this.user_role === 3)
      {
        this.user_role = "Retailer"
      }
      else if(this.user_role === 4)
      {
        this.user_role = "Product Master"
      }
     
      this.username= JSON.parse(localStorage.getItem('currentUser'))["userName"];
      this.usermail = JSON.parse(localStorage.getItem('currentUser'))["userMail"];
      this.userno = JSON.parse(localStorage.getItem('currentUser'))["userNumber"];
      this.userid = JSON.parse(localStorage.getItem('currentUser'))["userId"];
      });
    }
  }

}
