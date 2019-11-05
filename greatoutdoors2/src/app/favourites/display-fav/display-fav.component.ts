import { Component, OnInit } from '@angular/core';
import { UserLoginServiceModule } from 'src/app/user/user-login/user.service';
import { Product } from 'src/app/models/product.model';
import { FavProductService } from './fav.service';

@Component({
  selector: 'app-display-fav',
  templateUrl: './display-fav.component.html',
  styleUrls: ['./display-fav.component.css']
})
export class DisplayFavComponent implements OnInit {

  userId : string;
  username : string;
  allFavProd : Product[];
  constructor(private favService : FavProductService) { }

  ngOnInit() {

    if (localStorage.length > 0) {

      
      this.userId = JSON.parse(localStorage.getItem('currentUser'))["userId"];
      this.username = JSON.parse(localStorage.getItem('currentUser'))["userName"];
      
    }
    else {
      UserLoginServiceModule.loginEventEmitter.subscribe((data) => {
        this.userId = JSON.parse(data)["userId"];
        
      });
    } 
    this.favService.viewFavProducts(this.userId) .subscribe(
      allFavProdList => {
        this.allFavProd = allFavProdList as Product[]});

  }

}
