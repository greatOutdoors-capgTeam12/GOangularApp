import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ReportService {
    constructor(private httpClient: HttpClient) {

    }

    static spinner : boolean = false;

    public sendFormDataAndGetResponse(componentJsonObject:any, reportComponentObject:any) {
        let URL:string = componentJsonObject["URL"];
        let jsonFormData:any = componentJsonObject["jsonFormData"];
        console.log('Data Sent ', JSON.stringify(jsonFormData));
        ReportService.spinner = true;
        return this.httpClient.post(URL, jsonFormData).subscribe (
            data => {
                console.log("Data response received from server", data);
                reportComponentObject.saveData (data);
            },
            error => {
                //console.log("Error response received from server", error);
                reportComponentObject.saveData (error);
            }
        );
    }
    
    public getDataToLoad (componentJsonObject:any, reportComponentObject:any) {
        let URL:string = componentJsonObject["URL"];
        ReportService.spinner = false;
        return this.httpClient.post(URL, {}).subscribe(
            data => {
                //console.log("Data response received from server", data);
                reportComponentObject.savePrefetchData (data);
            },
            error => {
                //console.log("Error response received from server", error);
                reportComponentObject.savePrefetchData (error);
            }
        );
    }

    
}