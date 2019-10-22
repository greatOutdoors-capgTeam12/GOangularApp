import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserLoginServiceModule } from '../user/user-login/user.service';
import { Injectable } from '@angular/core';

@Injectable()
export class LoginRegisterGuardService implements CanActivate
{
    loggedUser : string;
    user_role : number;
    constructor(private _router: Router)
    {

    }
    canActivate(route : ActivatedRouteSnapshot, state : RouterStateSnapshot) : boolean
    {
        if (localStorage.length == 0) {
             return true;
         } 
         else
         {
             this._router.navigate(['/alreadyloggedin']);
             return false;
         }

    }

}