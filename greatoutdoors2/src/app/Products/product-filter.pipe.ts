import { PipeTransform, Pipe } from '@angular/core';
import { Product } from '../models/product.model';
import { ProductServiceModule } from './product.service';


@Pipe({name : 'productFilter'})

export class ProductFilterPipe implements PipeTransform{
    private productservice : ProductServiceModule;
    transform(products : Product[], searchTerm : string):Product[]
    {
       
        if(!products || !searchTerm)
        {
            return products;
        }


        return products.filter(product => 
            product.prodName.toLowerCase().indexOf(searchTerm .toLowerCase()) !== -1);
    }
}