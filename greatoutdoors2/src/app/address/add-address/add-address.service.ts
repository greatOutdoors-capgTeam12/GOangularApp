import { Injectable, SystemJsNgModuleLoader } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Address } from 'src/app/models/address.model';


@Injectable()
export class AddaddressServiceModule {
     constructor(private httpClient: HttpClient, private toastr: ToastrService) {

    }
    addtoaddress(addretaddress: Address,userid : string, addId : string) : Observable<any> {

        if(addId === "0")
        {
        const httpOptions: any = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST',
                'Access-Control-Allow-Origin': '*'
            })
        };


        return this.httpClient.post("http://localhost:9090/go/AddAddressServlet", {
            "userId": userid,
            "building_number": addretaddress.building_number,
            "city": addretaddress.city,
            "state": addretaddress.state,
            "zip": addretaddress.zip,
            "country": addretaddress.country,
           
        })
    }

else
{
    const httpOptions: any = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Origin': '*'
        })
    };


    return this.httpClient.post("http://localhost:9090/go/UpdateAddressServlet", {
        "userId": userid,
        "addressId":addId,
        "building_number": addretaddress.building_number,
        "city": addretaddress.city,
        "state": addretaddress.state,
        "zip": addretaddress.zip,
        "country": addretaddress.country,
       
    })
}
}

}
