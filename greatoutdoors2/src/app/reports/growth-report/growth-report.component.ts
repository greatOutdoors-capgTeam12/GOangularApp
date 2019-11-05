import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ReportService } from '../reports.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-growth-report',
  templateUrl: './growth-report.component.html',
  styleUrls: ['./growth-report.component.css']
})
export class GrowthReportComponent implements OnInit {

  constructor(private fb: FormBuilder, private reportService: ReportService) {

  }




  public reportTypeList = [
    { viewValue: "Month to Month", value: "1" },
    { viewValue: "Quarter to Quarter", value: "2" },
    { viewValue: "Year to Year", value: "3" }]

 

  tableItems: GrowthReportTableItem[] = [];


  growthReportForm = this.fb.group({
    reportType: [''],
    startDate: [''],
    endDate: ['']
  });



  ngOnInit() {
   
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
      "URL": "http://localhost:9090/go/rest/reports/growthReport",
      "jsonFormData": {
        "reportType": this.growthReportForm.controls["reportType"].value,
        "startDate": this.growthReportForm.controls["startDate"].value,
        "endDate": this.growthReportForm.controls["endDate"].value

      }
    };
    this.reportService.sendFormDataAndGetResponse(jsonObject, this);
  }





  public extractDataFromResponse(subscribeDataObject: any) {
    subscribeDataObject.forEach(element => {
      let x = new GrowthReportTableItem(
        element["period"],
        element["revenue"],
        element["amountChange"],
        element["percentageGrowth"],
        element["colorCode"]);
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





class GrowthReportTableItem {

  public period: string;
  public revenue: number;
  public amountChange: number;
  public percentageGrowth: number;
  public colorCode: string;


  constructor(period: string, revenue: number, amountChange: number, percentageGrowth: number, colorCode: string) {

    this.period = period,
      this.revenue = revenue,
      this.amountChange = amountChange,
      this.percentageGrowth = percentageGrowth,
      this.colorCode = colorCode
  }
}