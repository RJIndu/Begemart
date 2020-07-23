import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from '../../common.service';
import { NbDialogService, NbIconLibraries, NbDialogRef } from '@nebular/theme';
import { Router } from '@angular/router';
import { stringValidator } from '../newproduct/newproduct.component';
import { MessagedialogComponent } from '../messagedialog/messagedialog.component';

@Component({
  selector: 'ngx-newcategory',
  templateUrl: './newcategory.component.html',
  styleUrls: ['./newcategory.component.scss']
})
export class NewcategoryComponent implements OnInit {
  @Input() editCategoryObj;
  @Input() sel_parentid;
  categoryForm: FormGroup; 
  isEditForm: boolean=false;
  showprogress: boolean=false;
  isSetAsMain:boolean=false;
  catListObj;
  categories: any;
  categoriesObj: any;
  evaIcons: string[];
  result: any;
  selected_pid: any;

  constructor(private commonService: CommonService, private dialogService: NbDialogService,
    protected ref: NbDialogRef<NewcategoryComponent>,private formBuilder: FormBuilder,private router: Router,iconsLibrary: NbIconLibraries) {
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
    }); }

  ngOnInit() {
    this.categoryForm = this.formBuilder.group({     
      name:  ['', [stringValidator,Validators.required, Validators.minLength(5), Validators.pattern('^[ A-Za-z0-9_.:;,&()-\/]*')]],     
      active:[''], 
      level:[''], 
      parentid:['']
  });
  
  this.categoryForm.controls["active"].setValue(false); 
  this.categoryForm.controls["level"].setValue(false); 

  this.getcategories();
  

  if(this.editCategoryObj){
    this.isEditForm=true;
      this.categoryForm.controls["name"].setValue(this.editCategoryObj.name);
      this.categoryForm.controls["active"].setValue(this.editCategoryObj.active); 
      this.categoryForm.controls["level"].setValue(this.editCategoryObj.level==1?true:false);
      
      if(this.editCategoryObj.parentid!=''){
        this.categoryForm.controls["parentid"].setValue(this.editCategoryObj.parentid);
      }else{
        this.categoryForm.controls["parentid"].setValue(this.categories[0]._id);
      }
      
      if(this.editCategoryObj.level==1){
        this.isSetAsMain=true;
      }
      
  }
  }

  onCheckChange(e){
    if(e.target.checked){
      this.isSetAsMain=true;
      this.categoryForm.controls["level"].setValue(true); 
    }else{
      this.isSetAsMain=false;
      this.categoryForm.controls["level"].setValue(false); 
    }
  }

  onSelectedCat(e){
    this.categoryForm.controls['parentid'].setValue(e.value, {
      onlySelf: true
    })
  }

  getcategories(){
    this.commonService.getInitCategoryList().subscribe(res => {
      if (res != null && res != undefined && res.length>0 ) {
        this.categories=res;
        if(this.sel_parentid){
          this.categoryForm.controls["parentid"].setValue(this.sel_parentid);
        }else{
          this.categoryForm.controls["parentid"].setValue(this.categories[0]._id);
        }
        
      }else{
        this.fetchCategories();
      }
    },err =>{
      console.log("err ngOnInit: "+err);
    }
    );
  }
  fetchCategories(){    
    this.commonService.getAllCategories().subscribe(res => {
      if(res.status=="success"){
        this.categories=res.data.categories;
        if(this.sel_parentid){
          this.categoryForm.controls["parentid"].setValue(this.sel_parentid);
        }else{
          this.categoryForm.controls["parentid"].setValue(this.categories[0]._id);
        }
        // console.log("this.categories: "+JSON.stringify(this.categories,null,2));
        this.commonService.setInitCategoryList(this.categories);
      }      
    });        
}


  submit(){
    this.showprogress = true;
    let formdata={    
      name:  this.categoryForm.controls["name"].value,
      active: this.categoryForm.controls["active"].value,
      level:this.categoryForm.controls["level"].value?1:0,
      parentid:this.categoryForm.controls["parentid"].value
    }

    if(this.editCategoryObj){            
      this.commonService.updateCategory(formdata,this.editCategoryObj._id).subscribe(res => {
        // this.showStatusMessage(res);  
        this.categoryForm.markAsPristine();
        this.showprogress = false;
        this.result=res;
        this.fetchCategories();
        
      });
    }else{
      this.commonService.createCategory(formdata).subscribe(res => {         
        // this.showStatusMessage(res);
        this.categoryForm.markAsPristine();
        this.showprogress = false;
        this.result=res;
        this.categoryForm.reset();
        this.fetchCategories();
      });
    }
  }
  
  showStatusMessage(message) {
    this.dialogService.open(
      MessagedialogComponent,
      {
        context: {
          messageObj:message
        },
        closeOnEsc: false,
      }).onClose.subscribe(res => {
        this.showprogress = false;
      });
  }
}
