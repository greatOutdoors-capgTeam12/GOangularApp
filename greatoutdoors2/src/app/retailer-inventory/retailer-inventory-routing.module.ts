import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RetailerInventoryComponent } from "./retailer-inventory.component";

const routes: Routes = [
  { path: 'retailerInventory', component: RetailerInventoryComponent,
    children: [ 
      { path: 'shelfTimeReport' }
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