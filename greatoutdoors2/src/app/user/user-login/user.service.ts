import { Injectable, SystemJsNgModuleLoader, EventEmitter } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class UserLoginServiceModule {

    static loggedINUser:string = null;
    static loginEventEmitter: EventEmitter<any> = new EventEmitter<any>();

    constructor(private httpClient: HttpClient, private toastr: ToastrService) {

    }
    loginUser(existUser: User) : Observable<any> {

        const httpOptions: any = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST',
                'Access-Control-Allow-Origin': '*'
            })
        };


        return this.httpClient.post("http://localhost:9090/go/UserLoginServlet", {
            "userId": existUser.userId,
            "password": existUser.userPassword,
        })
        
    }

    logout(userId : string) : Observable<any>
    {
        const httpOptions: any = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST',
                'Access-Control-Allow-Origin': '*'
            })
        };


        return this.httpClient.post("http://localhost:9090/go/LogoutServlet", {
            "userId": userId,
            
    });
    }
}
