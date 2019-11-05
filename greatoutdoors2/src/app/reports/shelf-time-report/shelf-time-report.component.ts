import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ReportService } from '../reports.service';
import { HttpErrorResponse } from '@angular/common/http';

class ShelfTimeReportTableItem {
  public productCategoryName: string;
  public productName: string;
  public productUIN: string;
  public productShelfTimePeriod: string;

  constructor(pcn: string, pn: string, puin: string, pstp: string) { 
      this.productCategoryName = pcn,
      this.productName = pn,
      this.productUIN = puin,
      this.productShelfTimePeriod = pstp
  }
}

@Component({
  selector: 'app-shelf-time-report',
  templateUrl: './shelf-time-report.component.html',
  styleUrls: ['./shelf-time-report.component.css']
})
export class ShelfTimeReportComponent implements OnInit {
  public responseJson: any;
  public responseError: any;

  public retailerIdList: any []; 
  // This will be loaded with all registered retailer ids who have atleast 1 order

  public reportTypeList = [
    { viewValue: "Monthly Shelf Time Report", value: "1"},
    { viewValue: "Quarterly Shelf Time Report", value: "2"},
    { viewValue: "Yearly Shelf Time Report", value: "3"}
  ];
  // These are the different types of shelf time reports available

  //pcn: string = null, pn: string = null, puin: string = null, pstp: string = null
  tableItems: ShelfTimeReportTableItem [];


  // Form group declaration
  shelfTimeReportForm = this.fb.group({
    retailerId: [''],
    reportType: [''],
    startDate: [''],
    endDate: ['']
  });

  constructor(private fb: FormBuilder, private reportService: ReportService) { }

  //Boolean variables to control form elements
  public showStartDate: boolean = false;
  public showEndDate: boolean = false;
  ngOnInit() {
    this.showStartDate = true;
    this.showEndDate = false;
    this.retailerIdList = [];

    let url = "http://localhost:9090/capgemini.go/RetailerInventory/RetailerList";
    let jsonObject:any = {
      "URL": url
    };
    this.reportService.getDataToLoad(jsonObject, this);
  }

  async onSubmit() { 
    // clear table
    this.clearTable();
    let url = "http://localhost:9090/capgemini.go/RetailerInventory/ShelfTimeReport";
    let jsonObject:any = {
      "URL": url,
      "jsonFormData": {
        "retailerId": this.shelfTimeReportForm.controls["retailerId"].value,
        "reportType": this.shelfTimeReportForm.controls["reportType"].value,
        "startDate": this.shelfTimeReportForm.controls["startDate"].value,
        "endDate": this.shelfTimeReportForm.controls["endDate"].value
      }
    };
    this.reportService.sendFormDataAndGetResponse(jsonObject, this);
  }

  public clearTable () {
    this.tableItems = [];
  }

  public extractDataFromResponse (subscribeDataObject:any) {
    if (!(subscribeDataObject == null)) {
      subscribeDataObject.forEach(element => {
        let newTableItem = new ShelfTimeReportTableItem(
          element["productCategoryName"],
          element["retailerUserId"],
          element["productUniqueId"],
          element["shelfTimePeriod"]);
          this.tableItems.push(newTableItem);
      });
    }
  }

  // this function is intended to act like an abstract method
  public saveData (subscribeDataObject: any) {
    // parse subscribeDataObject and save the relevant data
    if (subscribeDataObject instanceof HttpErrorResponse) {
      this.responseError = subscribeDataObject;
      console.log ("Error Occured:", this.responseError["message"]);
    } else {
      this.responseJson = subscribeDataObject;
      console.log("Data Received", this.responseJson);
      this.extractDataFromResponse(this.responseJson);
    }
  }

  public extractPrefetchDataResponse (subscribeDataObject:any) {
    if (!(subscribeDataObject == null)) {
      subscribeDataObject.forEach(element => {
        this.retailerIdList.push({retailerId:element["retailerId"], retailerName:element["retailerName"]});
      });
    }
  }

  // this function is intended to act like an abstract method
  public savePrefetchData (subscribeDataObject: any) {
    if (subscribeDataObject instanceof HttpErrorResponse) {
      this.responseError = subscribeDataObject;
      console.log ("Error Occured:", this.responseError["message"]);
    } else {
      this.responseJson = subscribeDataObject;
      console.log("Data Received", this.responseJson);
      this.extractPrefetchDataResponse(this.responseJson);
    }
  }
}