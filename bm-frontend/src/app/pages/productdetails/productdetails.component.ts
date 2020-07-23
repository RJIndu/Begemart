import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.scss']
})
export class ProductdetailsComponent implements OnInit {
  productItem: any;

  constructor(private router: Router) { 
    this.productItem = this.router.getCurrentNavigation().extras.state.pObj;
    // console.log("ProductdetailsComponent: "+JSON.stringify(this.productItem,null,2));
  }


  navigateBack(){
    this.router.navigateByUrl('pages/products');
  }

  ngOnInit() {
  }

}
