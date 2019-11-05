import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit {

  private _searchTerm : string;
  @Input()
  set searchTerm(val : string)
  {
    this._searchTerm = val;
  }

  get searchTerm() : string{

    return this._searchTerm;
  }
  constructor() { }

  ngOnInit() {
  }

  viewLarge():void{
    document.getElementById('next-btn').style.display='block';
    document.getElementById('product-display').style.display='block';
    document.getElementById('product-catalog').style.display='none';

  }
  viewSmall():void{
    document.getElementById('next-btn').style.display='none';
    document.getElementById('product-display').style.display='none';
    document.getElementById('product-catalog').style.display='block';

  }
}
