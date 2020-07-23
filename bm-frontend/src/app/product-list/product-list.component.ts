import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  @Input() productItem;
  @Input() showdetails;
  page = 1;
  selectedImage: any;
  showBorder:Boolean;
  availColors: any=[];
  availSizes: any=[];
  
  constructor(private router: Router) { }

  ngOnInit() {
    if(this.showdetails){
      this.showBorder=false;
      this.selectedImage=this.productItem.imagePath[0].path;
      let colors=this.productItem.available_colors;
      let sizes=this.productItem.available_size;
      debugger
      if(colors!=""){
        this.availColors=colors.toString().split(',');
      }
      if(sizes!=""){
        this.availSizes=sizes.toString().split(',');
      }
     
    }
    
  }


  navigatedetails(pObj){
   
    this.router.navigate(['pages/productdetails'], {
      state: { pObj: pObj }
    });

    // this.router.navigate(['pages/productdetails', {page: this.page }]);
    // this.router.navigateByUrl('pages/productdetails', { skipLocationChange: true });
  }

  changeImage(imagepath){
    this.selectedImage=imagepath;
    this.showBorder=true;
  }
}
