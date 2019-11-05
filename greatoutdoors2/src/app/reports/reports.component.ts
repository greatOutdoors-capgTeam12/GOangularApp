import { Component } from '@angular/core';
import { ReportService } from './reports.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent  {
  title = 'Reports';
  showLoadingIndicator : boolean = true;
  constructor(private _reportService : ReportService)
  {
      this.showLoadingIndicator = ReportService.spinner;
  }
}

