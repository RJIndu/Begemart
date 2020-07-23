import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../common.service';

@Component({
  selector: 'ngx-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  categories;
  categoriesObj: any;
  catlevel1: any;
  catlevel2: any;
  evaIcons: string[];
  constructor(private commonService: CommonService,iconsLibrary: NbIconLibraries
    ,private dialogService: NbDialogService) {
    this.evaIcons = Array.from(iconsLibrary.getPack('eva').icons.keys())
    .filter(icon => icon.indexOf('outline') === -1);

  iconsLibrary.registerFontPack('fa', {
    packClass: 'fa',
    iconClassPrefix: 'fa'
  });
  iconsLibrary.registerFontPack('far', {
    packClass: 'far',
    iconClassPrefix: 'fa'
  });
  iconsLibrary.registerFontPack('ion', {
    iconClassPrefix: 'ion'
  });
 }

  ngOnInit() {
    this.commonService.getInitCategoryList().subscribe(res => {
      if (res != null && res != undefined && res.length>0 ) {
        this.categories=res;
        this.catlevel1=this.categories.filter(o=>o.level==1);
      this.catlevel2=this.categories.filter(o=>o.level==0);
      }else{
        this.fetchCategories();

      }
      
      // this.parseCategories();
    },err =>{
      console.log("err ngOnInit: "+err);
    }
    );
  }

  getCatByParentId(pid){
    let result=this.categories.filter(o=>o.level==0 && o.parentid==pid);
    console.log("loopMenu result: "+JSON.stringify(result,null,2));
    return result;
  }

  parseCategories(){
    if(this.categories){
      let obj1=this.categories.filter(o=>o.level=1);
      let obj2=this.categories.filter(o=>o.level=0);
      let obj2Arr=[];
      obj2.forEach(e => {
        obj2Arr.push({data:e,childs:this.getCatByParentId(e.parentid)});
      });
      console.log(JSON.stringify(obj2Arr,null,2));
      // this.categoriesObj = this.categories.reduce((state,current) => {
      //   let {_id,name,level, active, parentid,productid} = current;
        
      //   let levels = state[level] || (state[level] = {});
      //   let actv = levels[_id] || (levels[_id] = {});
      //   // let actv = levels[_id] || (levels[_id] = {});
      //   let parentsArr = actv[parentid] || (actv[parentid] = []);
      //   // let productidsArr = parents[productid] || (parents[productid] = []);
        
      //   parentsArr.push(current);
          
      //   return state;
      // }, {});
      console.log("parseCategories: "+JSON.stringify(this.categoriesObj,null,2));
    }
  }
  
  fetchCategories(){    
    this.commonService.getAllCategories().subscribe(res => {
      if(res.status=="success"){
        this.categories=res.data.categories;
        this.catlevel1=this.categories.filter(o=>o.level==1);
      this.catlevel2=this.categories.filter(o=>o.level==0);
        // console.log("this.categories: "+JSON.stringify(this.categories,null,2));
        this.commonService.setInitCategoryList(this.categories);
      }      
    });        
}

prodList(id){
  this.dialogService
  .open(TableproductsComponent, {
    context: {
      categoryid:id
    },
    closeOnEsc: false,
    closeOnBackdropClick:false
  })
  .onClose.subscribe(res => {

  });
}

    addCat(id){
      this.dialogService
      .open(NewcategoryComponent, {
        context: {
          sel_parentid:id
        },
        closeOnEsc: false,
        closeOnBackdropClick:false
      })
      .onClose.subscribe(res => {

      });
    }


    editCat(editObj){
      this.dialogService
      .open(NewcategoryComponent, {
        context: {
          editCategoryObj:editObj
        },
        closeOnEsc: false,
        closeOnBackdropClick:false
      })
      .onClose.subscribe(res => {

      });
    }

    deleteCat(id){
      this.dialogService
      .open(DeletepromptComponent, {
        closeOnEsc: false,
      })
      .onClose.subscribe(res => {
        if (res == "Delete") {
          // console.log("Delete prodObj: "+JSON.stringify(prodObj));
  
          this.commonService.deleteCategories(id).subscribe(res => {
            // console.log("Delete product: "+JSON.stringify(res));
            if(res.status=="success"){
              this.fetchCategories();
            }
            
          });
        }
      });
      
    
    }
}

import { PipeTransform, Pipe } from '@angular/core';
import { NbIconLibraries, NbDialogService } from '@nebular/theme';
import { DeletepromptComponent } from '../deleteprompt/deleteprompt.component';
import { NewcategoryComponent } from '../newcategory/newcategory.component';
import { TableproductsComponent } from '../tableproducts/tableproducts.component';

@Pipe({ name: 'filterBy' })
export class FilterByPidPipe implements PipeTransform {
  transform(arr: any, pid): string {
    return arr.filter(o=>o.parentid==pid);
  }
}
