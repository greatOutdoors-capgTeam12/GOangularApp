# GOangularApp
 Front End developed on Angular

##  Commands To remember
 // Do not use the below command now, as it is only required once
 ng new greatoutdoors   ->  command used to initiate sources for new angluar app
 
 // Use this command when you are in the project root directory. By default, the app is hosted on localhost:4200
 ng serve               ->  to serve the app on localhost:4200

 // Use this command to install jquerry; (problems with '$')
 npm i @types/jquery
### configure bootstrap
 npm install bootstrap jquery --save

### add following in file .angular-cli.json:
 "styles": [
     "styles.css",
     "../node_modules/bootstrap/dist/css/bootstrap.min.css"
   ],
   "scripts": [
     "../node_modules/jquery/dist/jquery.min.js",
     "../node_modules/bootstrap/dist/js/bootstrap.min.js"
   ],

### To create a new component and add mappings automatically
Legend:
  SPA ->  Single Page Application
  g   ->  generate
  c   ->  component
 // Use this command to create a new component of the SPA. 
 ng g c "component-name"

### To create a new component and add mappings automatically
1) Create a folder with name of component under "src/app/" directory.
2) Create 3 files namely:
  component-name.html
  component-name.css
  component-name.ts
  component-name.spec.ts  // this file is optional, by default, don't add it
3) Change component-name.component.ts file to include selector, templateUrl, styleUrls
  eg. 
            @Component({
            selector: 'app-navbar',                   // this
            templateUrl: './navbar.component.html',   // this
            styleUrls: ['./navbar.component.css']     // this
          })
  make sure to add necessary imports using import {} from 'some-library'
    eg: import { Component, OnInit } from '@angular/core';

4) To declare the manually defined definition, go to app.module.ts and add component to @NGModule
  eg.
            @NgModule({
            declarations: [
              AppComponent,       // declare the components in the app
              NavbarComponent,    // declare the components in the app
              HomeComponent       // declare the components in the app
            ],
            imports: [
              BrowserModule,
              CommonModule,
              AppRoutingModule,
              FormsModule,
              
            ],
            providers: [],
            bootstrap: [AppComponent]
          })

 5) To use a created component in your app, just write the tags <app-component-name></app-component-name>
    where you want the angular transpiler to insert your component into.

### usefull information
[   ]   ->  denotes 1 way data binding (write | in-coming)
[( )]   ->  denotes 2 way data binding (read | out-going / write | in-coming)
{{ }}   ->  denotes expression
String Interpolation  ->  a technique used by angular transpiler

