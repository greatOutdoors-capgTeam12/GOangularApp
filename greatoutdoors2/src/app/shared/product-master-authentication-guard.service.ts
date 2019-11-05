import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserLoginServiceModule } from '../user/user-login/user.service';
import { Injectable } from '@angular/core';

@Injectable()
export class ProductMasterGuardService implements CanActivate
{
    loggedUser : string;
    user_role : number;
    constructor(private _router: Router)
    {

    }
    canActivate(route : ActivatedRouteSnapshot, state : RouterStateSnapshot) : boolean
    {
        if (localStorage.length > 0) {

            this.loggedUser = JSON.stringify(localStorage.getItem('currentUser'));
            this.user_role = +JSON.parse(localStorage.getItem('currentUser'))["userCategory"];
          }
          else {
            UserLoginServiceModule.loginEventEmitter.subscribe((data) => {
              this.loggedUser = UserLoginServiceModule.loggedINUser;
              this.user_role = +JSON.parse(localStorage.getItem('currentUser'))["userCategory"];
            });
          }

         if(this.loggedUser && this.user_role === 4)
         {
             return true;
         } 
         else
         {
             this._router.navigate(['/not-found']);
             return false;
         }

    }

}