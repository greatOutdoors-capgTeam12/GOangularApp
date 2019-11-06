import { Component } from '@angular/core';
import { RetailerInventoryService } from './retailer-inventory.service';

@Component({
    selector: 'app-retailer-inventory',
    templateUrl: './retailer-inventory.component.html',
    styleUrls: ['./retailer-inventory.component.css']
})
export class RetailerInventoryComponent {
    title = 'RetailerInventory';
    showLoadingIndicator: boolean = true;
    constructor(private _retailerInventoryService: RetailerInventoryService) {
        
    }
}

