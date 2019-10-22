import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportsComponent } from './reports.component';
import { ShelfTimeReportComponent } from './shelf-time-report/shelf-time-report.component';
import { DeliveryTimeReportComponent } from './delivery-time-report/delivery-time-report.component';
import { RevenueReportComponent } from './revenue-report/revenue-report.component';
import { GrowthReportComponent } from './growth-report/growth-report.component';
import { RetailerReportComponent } from './retailer-report/retailer-report.component';
import { SalesReportComponent } from './sales-report/sales-report.component';

const routes: Routes = [
  { path: 'reports', component: ReportsComponent,
    children: [ 
      { path: 'shelfTimeReport', component: ShelfTimeReportComponent },
      { path: 'deliveryTimeReport', component: DeliveryTimeReportComponent },
      { path: 'revenueReport', component: RevenueReportComponent },
      { path: 'growthReport', component: GrowthReportComponent },
      { path: 'retailerReport', component: RetailerReportComponent },
      { path: 'salesReport', component: SalesReportComponent }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ReportsRoutingModule { }
