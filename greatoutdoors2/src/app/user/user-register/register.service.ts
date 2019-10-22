import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class UserRegisterServiceModule {

    constructor(private httpClient: HttpClient, private toastr: ToastrService) {

    }
    loginUser(newUser: User) : Observable<any> {
        console.log(JSON.stringify(newUser));

        const httpOptions: any = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST',
                'Access-Control-Allow-Origin': '*'
            })
        };

            return this.httpClient.post("http://localhost:9090/go/UserRegistrationServlet", {
            "userId": newUser.userId,
            "userName": newUser.userName,
            "userMail": newUser.userMail,
            "password": newUser.userPassword,
            "userNumber": newUser.userNumber.toString(),
            "userCategory": newUser.userCategory.toString(),
            
        })
    }
}
