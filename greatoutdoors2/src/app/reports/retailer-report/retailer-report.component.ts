import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ReportService } from '../reports.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-retailer-report',
  templateUrl: './retailer-report.component.html',
  styleUrls: ['./retailer-report.component.css']
})

export class RetailerReportComponent implements OnInit {

  constructor(private fb: FormBuilder, private reportService: ReportService) {

  }

  userIdList: string[] = ['RT01', 'RT02', 'RT03']; // using some dummy data for now
  // This will be loaded with all registered sales ids who have atleast 1 order

  tableItems: RetailerReportTableItem[] = [];

  retailerReportForm = this.fb.group({
    userId: [''],
    setDiscount: [''] ,
  });



  private loadUsersFromRemoteHost(): any {
    // load this.salesIdList with values from database
    return this.userIdList; // for now
  }

  ngOnInit() {
    this.userIdList = this.loadUsersFromRemoteHost();
  }



  public clearTable() {
    this.tableItems = [];
  }

  public responseJson: any;
  public responseError: any;
  async onSubmit() {
    // clear table
    this.clearTable();
    let jsonObject: any = {
      "URL": "http://localhost:9090/go/rest/reports/retailerReport",
      "jsonFormData": {
        "userId": this.retailerReportForm.controls["userId"].value,
        "setDiscount": this.retailerReportForm.controls["setDiscount"].value
      }
    };
    this.reportService.sendFormDataAndGetResponse(jsonObject, this);
  }

  public extractDataFromResponse(subscribeDataObject: any) {
    subscribeDataObject.forEach(element => {
      let x = new RetailerReportTableItem(
        element["userID"],
        element["discount"]);
      this.tableItems.push(x);
    });
  }

  // this function is intended to act like an abstract method
  public saveData(subscribeDataObject: any) {
    // parse subscribeDataObject and save the relevant data
    if (subscribeDataObject instanceof HttpErrorResponse) {
      this.responseError = subscribeDataObject;
      console.log("Error Occured:", this.responseError["message"]);
    } else {
      this.responseJson = subscribeDataObject;
      console.log("Data Received");
      this.extractDataFromResponse(this.responseJson);
    }
  }
}
  
class RetailerReportTableItem {
  public userId: string;
  public discount: number;
  constructor( user: string, discount: number) {
    this.userId = user,
    this.discount = discount
  }
}