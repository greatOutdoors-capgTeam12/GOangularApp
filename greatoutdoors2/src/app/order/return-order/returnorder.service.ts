import { Injectable, SystemJsNgModuleLoader } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ReturnOrder } from 'src/app/models/returnorder.model';



@Injectable()
export class ReturnOrderServiceModule {

    constructor(private httpClient: HttpClient, private toastr: ToastrService) {

    }
    returnOrder(returnorder: ReturnOrder): Observable<any> {

        const httpOptions: any = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST',
                'Access-Control-Allow-Origin': '*'
            })
        };


        return this.httpClient.post("http://localhost:9090/go/ReturnOrderServlet", {
            "userid": returnorder.userid,
            "orderid": returnorder.orderid,
            "reason": returnorder.reason,
        })
    }
}
