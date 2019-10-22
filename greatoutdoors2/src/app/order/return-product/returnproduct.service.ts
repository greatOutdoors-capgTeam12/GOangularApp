import { Injectable, SystemJsNgModuleLoader } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ReturnProduct } from 'src/app/models/returnproduct.model';




@Injectable()
export class ReturnProductServiceModule {

    constructor(private httpClient: HttpClient, private toastr: ToastrService) {

    }
    returnprod(returnproduct: ReturnProduct): Observable<any> {

        const httpOptions: any = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST',
                'Access-Control-Allow-Origin': '*'
            })
        };


        return this.httpClient.post("http://localhost:9090/go/ReturnProductServlet", {
            "userid": returnproduct.userid,
            "prodid": returnproduct.prodid,
            "orderid": returnproduct.orderid,
            "prodqty": returnproduct.prodqty.toString(),
            "reason": returnproduct.reason,
        })
    }
}
