import { Component,OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'ProductList';
  dataloaded = false;
  config: any;
  
  //store the data in the data structure of your choice.
  productsArray: any = [];

  keys : string [];
  productkeys : string[];

  constructor(private httpClient: HttpClient) { 
    this.config = {
      itemsPerPage: 100,
      currentPage: 1,
      totalItems: this.productsArray.count
    };
    
  }

  ngOnInit() {
    this.getProducts().subscribe(
      data => {
        this.productsArray = data["products"];
        this.keys = Object.keys(this.productsArray);
        this.productkeys = Object.keys(this.productsArray["12"]);
        this.dataloaded = true;
      }
    );
  }

  getProducts(): Observable<any[]> {
    return this.httpClient.get<any[]> ('/assets/products.json');
  }

  pageChanged(event){
    this.config.currentPage = event;
  }
}
