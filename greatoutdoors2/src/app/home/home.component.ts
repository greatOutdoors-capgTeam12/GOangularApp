import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @Input()
  title = 'Home Page'

  labelName = null;
  nameInput = null;
  
  constructor() {
    this.labelName = 'Full Name'

   }

  ngOnInit() {
    this.nameInput = this.title;
  }

}
