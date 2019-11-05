import { CanDeactivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { ProductMasterComponent } from './productmaster.component';

@Injectable()
export class CreateProductMasterCanDeactivateGuardService implements CanDeactivate<ProductMasterComponent>
{
    canDeactivate(component : ProductMasterComponent) : boolean
    {
        if(component.prodMastRegForm.dirty){
            return confirm('Are you sure you want to discard your changes ?');
        }
        return true;
    
    }
}