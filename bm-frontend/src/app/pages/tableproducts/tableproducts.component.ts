import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { CommonService } from '../../common.service';

export interface Products {
  imagePath: any;
  title: string;
 
}

@Component({
  selector: 'ngx-tableproducts',
  templateUrl: './tableproducts.component.html',
  styleUrls: ['./tableproducts.component.scss']
})
export class TableproductsComponent implements OnInit {
  @Input() categoryid;
  displayedColumns: string[] = ['title', 'imagePath'];
  // dataSource = ELEMENT_DATA;
  products: any;

  constructor(private commonService: CommonService,protected ref: NbDialogRef<TableproductsComponent>) { }
  showloader: boolean=true;
  ngOnInit() {
    this.showloader=true;
    this.commonService.getAllProducts().subscribe(res => {
      this.showloader=false;
      if(res.status=="success"){
        this.products=res.data.products;
        debugger
        this.products=this.products.filter(o=>o.categoryid==this.categoryid);
        this.commonService.setInitProductList(this.products);        
      } else{
        console.log("No products found");
      }
      
    },err =>{
      console.log("err ngOnInit: "+err);
    }
    );
  }

}
