import { Injectable, SystemJsNgModuleLoader } from '@angular/core';
import { CancelProductModel } from 'src/app/models/cancelProduct.model';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CancelProdService {

  constructor(private httpClient: HttpClient, private toastr: ToastrService) {
  }
  getProductCancel(cancelProduct: CancelProductModel): Observable<any> {
    const httpOptions: any = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Origin': '*'
      })
    };

    return this.httpClient.post("http://localhost:9090/go/CancelProductServlet", {
      "userId": cancelProduct.userId,
      "orderId": cancelProduct.orderId,
      "productId": cancelProduct.productId,
      "quantity": cancelProduct.quantity.toString()

    })
  }
}