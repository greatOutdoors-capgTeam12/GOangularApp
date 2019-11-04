import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ProductMasterRegisterModule {

    constructor(private httpClient: HttpClient, private toastr: ToastrService) {

    }
    registerUser(newUser: User) : Observable<any> {
        console.log(JSON.stringify(newUser));

        const httpOptions: any = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST',
                'Access-Control-Allow-Origin': '*'
            })
        };

            return this.httpClient.post("http://localhost:9090/capgemini.go/User/prodMastRegistration", {
            "userId": newUser.userId,
            "userName": newUser.userName,
            "userMail": newUser.userMail,
            "password": newUser.userPassword,
            "userNumber": newUser.userNumber.toString(),
        })
    }
}
