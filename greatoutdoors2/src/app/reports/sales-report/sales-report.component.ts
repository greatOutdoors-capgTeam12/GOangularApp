import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ReportService } from '../reports.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-sales-report',
  templateUrl: './sales-report.component.html',
  styleUrls: ['./sales-report.component.css']
})

export class SalesReportComponent implements OnInit {

  constructor(private fb: FormBuilder, private reportService: ReportService) {

  }

  userIdList: string[] = ['SR01', 'SR02', 'SR03']; // using some dummy data for now
  // This will be loaded with all registered sales ids who have atleast 1 order

  tableItems: SalesReportTableItem[] = [];

  salesReportForm = this.fb.group({
    userId: [''],
    setBonus: [''] ,
    setTarget: ['']


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
      "URL": "http://localhost:9090/go/rest/reports/salesReport",
      "jsonFormData": {
        "userId": this.salesReportForm.controls["userId"].value,
        "setBonus": this.salesReportForm.controls["setBonus"].value,
        "setTarget": this.salesReportForm.controls["setTarget"].value
      }
    };
    this.reportService.sendFormDataAndGetResponse(jsonObject, this);
  }

  public extractDataFromResponse(subscribeDataObject: any) {
    subscribeDataObject.forEach(element => {
      let x = new SalesReportTableItem(
        element["userId"],
        element["targetSales"],
        element["target"],
        element["currentSales"],
        element["bonus"]);
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
  
class SalesReportTableItem {

  public userId: string;
  public targetSales: number;
  public target: string;
  public currentSales: number;
  public bonus: number;



  constructor( user: string, targetSales: number, target: string, currentSales: number, bonus: number ) {
    this.userId = user,
      this.targetSales = targetSales,
      this.target = target,
      this.currentSales = currentSales,
      this.bonus = bonus
  }
}