import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Order } from '../models/Order.model';

@Injectable()
export class PlaceOrderServiceModule {

    constructor(private httpClient: HttpClient, private toastr: ToastrService) {

    }
    placeTheOrder(placeOrder: Order) : Observable<any> {

        const httpOptions: any = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST',
                'Access-Control-Allow-Origin': '*'
            })
        };


        return this.httpClient.post("http://localhost:9090/capgemini.go/BuyNowServlet", {
            "placeOrderCustId": placeOrder.userId,
            "placeOrderAddrId": placeOrder.addressId, 
        })
    }
}
