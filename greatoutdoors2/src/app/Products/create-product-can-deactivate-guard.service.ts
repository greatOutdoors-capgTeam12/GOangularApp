import { CanDeactivate } from '@angular/router';
import { AddProductFormComponent } from './add-product-form/add-product-form.component';
import { Injectable } from '@angular/core';

@Injectable()
export class CreateProductCanDeactivateGuardService implements CanDeactivate<AddProductFormComponent>
{
    canDeactivate(component : AddProductFormComponent) : boolean
    {
        if(component.addProdform.dirty)
        {
            return confirm('Are you sure you want to discard your changes ?');
        }

        return true;
    }
}