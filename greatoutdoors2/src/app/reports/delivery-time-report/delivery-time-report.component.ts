import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ReportService } from '../reports.service';
import { HttpErrorResponse } from '@angular/common/http';

class DeliveryTimeReportTableItem {
  public productCategoryName: string;
  public productName: string;
  public productUIN: string;
  public productDeliveryTimePeriod: string;

  constructor(pcn: string, pn: string, puin: string, pdtp: string) { 
      this.productCategoryName = pcn,
      this.productName = pn,
      this.productUIN = puin,
      this.productDeliveryTimePeriod = pdtp
  }
}

@Component({
  selector: 'app-delivery-time-report',
  templateUrl: './delivery-time-report.component.html',
  styleUrls: ['./delivery-time-report.component.css']
})
export class DeliveryTimeReportComponent implements OnInit {
  
  // These are the different types of shelf time reports available
  public reportTypeList = [
    { viewValue: "Item Delivery Time Report", value: "1"},
    { viewValue: "Category Delivery Time Report", value: "2"},
    { viewValue: "Outlier Item Time Report", value: "3"}
  ];

  // This will be loaded with all registered retailer ids who have atleast 1 order
  public retailerIdList: any [];
  
  //pcn: string = null, pn: string = null, puin: string = null, pdtp: string = null
  tableItems: DeliveryTimeReportTableItem [] = [];

  //Boolean variables to control form elements
  showStartDate: boolean = false;
  showEndDate: boolean = false;
  // Form group declaration
  deliveryTimeReportForm = this.fb.group({
    retailerId: [''],
    reportType: [''],
    startDate: [''],
    endDate: ['']
  });

  ngOnInit() {
    this.showStartDate = false;
    this.showEndDate = false;
    this.retailerIdList = [];
    
    let url = "http://localhost:9090/capgemini.go/RetailerInventory/RetailerList";
    let jsonObject:any = {
      "URL": url
    };
    this.reportService.getDataToLoad(jsonObject, this);
  }

  public responseJson: any;
  public responseError: any;
  async onSubmit() {
    // clear table
    this.clearTable();
    let url = "http://localhost:9090/capgemini.go/RetailerInventory/DeliveryTimeReport";
    let jsonObject:any = {
      "URL": url,
      "jsonFormData": {
        "retailerId": this.deliveryTimeReportForm.controls["retailerId"].value,
        "reportType": this.deliveryTimeReportForm.controls["reportType"].value
      }
    };
    this.reportService.sendFormDataAndGetResponse(jsonObject, this);
  }
/*
  {"retailerUserId":"RT01",
  "productCategory":3,
  "productUIN":"pd03uin00991",
  "productDeliveryTimePeriod":{"years":0,
    "months":0,
    "days":14,
    "zero":false,
    "negative":false,
    "units":["YEARS","MONTHS","DAYS"],
    "chronology":{"id":"ISO","calendarType":"iso8601"}},
    "productShelfTimePeriod":null}
*/

  public clearTable () {
    this.tableItems = [];
  }

  public extractDataFromResponse (subscribeDataObject:any) {
    if (!(subscribeDataObject == null)) {
      subscribeDataObject.forEach(element => {
        let newTableItem = new DeliveryTimeReportTableItem(
          element["productCategoryName"],
          element["retailerUserId"],
          element["productUniqueId"],
          element["deliveryTimePeriod"]);
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

  constructor(private fb: FormBuilder, private reportService: ReportService) {

  }
}