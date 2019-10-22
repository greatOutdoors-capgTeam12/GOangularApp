import { Injectable, SystemJsNgModuleLoader } from '@angular/core';
import { CancelOrderModel } from 'src/app/models/cancelOrder.model';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CancelOrdService {

  constructor(private httpClient: HttpClient, private toastr: ToastrService) {
  }
  getOrderCancel(cancelOrder: CancelOrderModel): Observable<any> {
    const httpOptions: any = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Origin': '*'
      })
    };

    return this.httpClient.post("http://localhost:9090/go/CancelOrderServlet", {
      "userId": cancelOrder.userId,
      "orderId": cancelOrder.orderId
    })
  }
}