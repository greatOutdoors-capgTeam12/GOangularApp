import { Injectable, SystemJsNgModuleLoader } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { cart } from '../models/cart.model';

@Injectable()
export class CartServiceModule {

    constructor(private httpClient: HttpClient, private toastr: ToastrService) {

    }
    addItem(addingItem: cart) : Observable<any> {

        const httpOptions: any = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST',
                'Access-Control-Allow-Origin': '*'
            })
        };

        console.log("Data Sent: ", {
            "addItemuserId": addingItem.userId,
            "addItemProdId": addingItem.productId,
            "addItemProdQty": addingItem.quantity.toString(),
        })

        return this.httpClient.post("http://localhost:9090/capgemini.go/Orders/AddItemServlet", {
            "addItemuserId": addingItem.userId,
            "addItemProdId": addingItem.productId,
            "addItemProdQty": addingItem.quantity.toString(),
        })
    }
}
