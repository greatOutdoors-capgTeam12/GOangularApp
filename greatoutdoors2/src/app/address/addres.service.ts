import { Injectable } from '@angular/core';
import { Observable, } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Injectable()
export class AddressServiceModule {


    constructor(private httpClient: HttpClient, ) {

    }



    ngOnInit() {

    }

    viewAddress(userId: string): Observable<any> {
        
            const httpOptions: any = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Access-Control-Allow-Methods': 'POST',
                    'Access-Control-Allow-Origin': '*'
                })
            };


            return this.httpClient.post("http://localhost:9090/go/ViewAddressServlet", {
                "userId": userId,
            });
        
        
        

    }

    deleteAddress(addressId: string): Observable<any> {
        var res = confirm('Are you sure you want to delete the address ?')
        if (res === true) {
            const httpOptions: any = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Access-Control-Allow-Methods': 'POST',
                    'Access-Control-Allow-Origin': '*'
                })
            };


            return this.httpClient.post("http://localhost:9090/go/DeleteAddressServlet", {
                "addressId": addressId,
            })
        }

    }
}





