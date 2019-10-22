import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable()
export class FavProductService 
{

    constructor(private httpClient: HttpClient,)
    {
        
    }
    viewFavProducts(userId: string): Observable<any> {
        
        const httpOptions: any = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST',
                'Access-Control-Allow-Origin': '*'
            })
        };


        return this.httpClient.post("http://localhost:9090/go/ViewFavProductsServlet", {
            "userId": userId,
        });
    }

}