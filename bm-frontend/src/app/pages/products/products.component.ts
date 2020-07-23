import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../common.service';
import { NbDialogService } from '@nebular/theme';
import { DeletepromptComponent } from '../deleteprompt/deleteprompt.component';


@Component({
  selector: 'ngx-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: any;
  showeditpage: boolean=false;
  currentEditProdObj: any;
  pageloader: boolean;
  
  constructor(private commonService: CommonService,private dialogService: NbDialogService) { 
    this.showeditpage=false;
  }

  fetchProducts(){    
        this.commonService.getAllProducts().subscribe(res => {
          if(res.status=="success"){
            this.products=res.data.products;
            this.commonService.setInitProductList(this.products);
            this.pageloader=false;
          }      
        });        
  }

  editProduct(currentEditObj){
    this.showeditpage=true;
    this.currentEditProdObj=currentEditObj;
  }

  hideEditPage(){
    this.showeditpage=false;
  }
  
  ngOnInit() {
    this.pageloader=true;
    this.commonService.getInitProductList().subscribe(res => {
      if (res != null && res != undefined && res.length>0 ) {
        this.products=res;
        this.pageloader=false;
      }else{
        this.fetchProducts();
      }
    },err =>{
      console.log("err ngOnInit: "+err);
    }
    );
  }

  deleteProduct(prodObj){
    this.dialogService
    .open(DeletepromptComponent, {
      closeOnBackdropClick: false,
    })
    .onClose.subscribe(res => {
      if (res == "Delete") {
        // console.log("Delete prodObj: "+JSON.stringify(prodObj));

        this.commonService.deleteProduct(prodObj._id).subscribe(res => {
          // console.log("Delete product: "+JSON.stringify(res));
          if(res.status=="success"){
            this.fetchProducts();
          }
          
        });
      }
    });
    
  }

}
