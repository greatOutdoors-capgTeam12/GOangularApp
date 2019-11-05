import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ReportService } from '../reports.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

class RevenueReportTableItem {
  public userID: string;
  public date: string;
  public orderID: string;
  public productCategory: string;
  public productID: string;
  public productPrice: string;

  constructor(user: string, date: string, order: string, prodcat: string, prodID: string, prodPrice: string) { 
    this.userID = user,
      this.date = date,
      this.orderID= order,
      this.productCategory = prodcat,
      this.productID = prodID,
      this.productPrice = prodPrice
  }
}

@Component({
  selector: 'app-revenue-report',
  templateUrl: './revenue-report.component.html',
  styleUrls: ['./revenue-report.component.css']
})
export class RevenueReportComponent implements OnInit {

  public categoryTypeList = [
    { viewValue: "Camping", value: "1"},
    { viewValue: "Golf", value: "2"},
    { viewValue: "Mountaneering", value: "3"},
    { viewValue: "Personal Accesories", value: "4"},
    { viewValue: "Outdoor Protection", value: "5"},
    { viewValue: "All Categories", value: "6"}
    
  ];
   // These are the different types of shelf time reports available

   public userIdList: string [] = ['RT01', 'RT02', 'RT03','SR01', 'SR02', 'SR03','ALL']; // using some dummy data for now
  // This will be loaded with all registered retailer ids who have atleast 1 order

  tableItems: RevenueReportTableItem [];

  // Form group declaration
  revenueReportForm = this.fb.group({
    userId: [''],
    categoryType: [''],
    startDate: [''],
    endDate: ['']
  });

  ngOnInit() {
    
    
  }

  public responseJson: any;
  public responseError: any;
  async onSubmit() {
    // clear table
    this.clearTable();
    let url = "http://localhost:9090/go/rest/reports/revenueReport";
    let jsonObject:any = {
      "URL": url,
      "jsonFormData": {
        "retailerId": this.revenueReportForm.controls["userId"].value,
        "reportType": this.revenueReportForm.controls["categoryType"].value,
        "startDate": this.revenueReportForm.controls["startDate"].value,
        "endDate": this.revenueReportForm.controls["endDate"].value
      }
    };
    this.reportService.sendFormDataAndGetResponse(jsonObject, this);
  }


  public clearTable () {
    this.tableItems = [];
  }


  public extractDataFromResponse (subscribeDataObject:any) {
    subscribeDataObject.forEach(element => {
      let x = new RevenueReportTableItem(
        element["userId"], 
        element["date"], 
        element["orderId"],
        element["productId"],
        element["productCategory"],
        element["productPrice"]);
        this.tableItems.push(x);
    });
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

  constructor(private fb: FormBuilder, private reportService: ReportService, private toastrService : ToastrService) {
    
  }
}

