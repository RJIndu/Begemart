import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { CommonService } from '../../common.service';
import { FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { Router } from '@angular/router';
import { NbDialogService, NbIconLibraries } from '@nebular/theme';
import { MessagedialogComponent } from '../messagedialog/messagedialog.component';

export function stringValidator(control: AbstractControl
  ): { [key: string]: any } | null {
   
    const strval = control.value;
    if(strval){
      const valid =strval.trim() == "" ? false :true;
      return valid  ? null : { invalidString: { valid: false, value: control.value } }
    }else{
      return false  ? null : { invalidString: { valid: false, value: control.value } }
    }
    
  }
  
@Component({
  selector: 'ngx-newproduct',
  templateUrl: './newproduct.component.html',
  styleUrls: ['./newproduct.component.scss']
})
export class NewproductComponent implements OnInit {
  @Input() editProdObj;
  newproductForm: FormGroup;
  imageurls = [];
  isEditForm: boolean=false;
  showprogress: boolean;
  categories: any;
  evaIcons: string[];
  
  onSelectFile(event) {
    let file = event.target.files[0];

  // alert(`File name: ${file.name}`);

    if (event.target.files && event.target.files[0]) {
      // console.log("event.target.files:"+JSON.stringify(event.target.files));
        var filesAmount = event.target.files.length;
        for (let i = 0; i < filesAmount; i++) {
                var reader = new FileReader();
                reader.onload = (event:any) => {                  
                   this.imageurls.push({fileno:i,path:event.target.result}); 
                }
                reader.readAsDataURL(event.target.files[i]);
        }
    }
  }

  constructor(private commonService: CommonService, private dialogService: NbDialogService,
    private formBuilder: FormBuilder,private router: Router,iconsLibrary: NbIconLibraries) {
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
    
    this.newproductForm = this.formBuilder.group({     
        title:  ['', [stringValidator,Validators.required, Validators.minLength(5), Validators.pattern('^[ A-Za-z0-9_.:;,&()-\/]*')]],
        brand: ['', [Validators.pattern('^[ A-Za-z0-9_.:;,&()-\/]*')]],
        description:['', [Validators.pattern('^[ A-Za-z0-9_.:;,&()-\/]*')]],
        price_mrp: ['',[Validators.required,Validators.pattern("^[0-9]*$")]],  
        price:['',[Validators.required,Validators.pattern("^[0-9]*$")]],    
        imagePath: [''],
        available_size: ['',[Validators.pattern("^([a-zA-Z0-9]+,?\s*)+$")]],
        available_colors:['',[Validators.pattern("^([a-zA-Z0-9]+,?\s*)+$")]],
        unitsInStock:['',[Validators.required,Validators.pattern("^[0-9]*$")]],
        setminorder:['',[Validators.pattern("^[0-9]*$")]],
        product_available:[''], 
        categoryid:[''], 
    });
    
    this.newproductForm.controls["product_available"].setValue(false); 
    
    
    if(this.editProdObj){
      this.isEditForm=true;
      
      // this.newproductForm.controls["categoryid"].setValue(this.editProdObj.categoryid);
      this.newproductForm.controls["title"].setValue(this.editProdObj.title);
      this.newproductForm.controls["brand"].setValue(this.editProdObj.brand);
      this.newproductForm.controls["description"].setValue(this.editProdObj.description);
      this.newproductForm.controls["price_mrp"].setValue(this.editProdObj.price_mrp);  
      this.newproductForm.controls["price"].setValue(this.editProdObj.price);       
      if(this.editProdObj.available_size!=""){
        this.newproductForm.controls["available_size"].setValue(this.editProdObj.available_size);
      }
      if(this.editProdObj.available_colors!=""){
        this.newproductForm.controls["available_colors"].setValue(this.editProdObj.available_colors);
      }
     
       
       this.newproductForm.controls["unitsInStock"].setValue(this.editProdObj.unitsInStock);
       this.newproductForm.controls["setminorder"].setValue(this.editProdObj.setminorder);
       this.newproductForm.controls["product_available"].setValue(this.editProdObj.product_available); 

      //  console.log();
       this.imageurls=this.editProdObj.imagePath;
       

    }

    this.fetchCategories();
  }

  deleteimg(filepath){
    for (let i = 0; i < this.imageurls.length; i++) {
      if(this.imageurls[i].fileno==filepath.fileno){        
        this.imageurls.splice(i, 1);
      }
    }    
  }
  
  onSelectedCat(e){
    this.newproductForm.controls['categoryid'].setValue(e.value, {
      onlySelf: true
    })
  }


  fetchCategories(){    
    this.commonService.getAllCategories().subscribe(res => {
      if(res.status=="success"){
        this.categories=res.data.categories;
        console.log("this.editProdObj.categoryid: "+this.editProdObj.categoryid);
        if(this.editProdObj.categ){
          this.newproductForm.controls["categoryid"].setValue(this.editProdObj.categoryid);
        }else{
          this.newproductForm.controls["categoryid"].setValue(this.categories[0]._id);
        }
        // console.log("this.categories: "+JSON.stringify(this.categories,null,2));
        // this.commonService.setInitCategoryList(this.categories);
      }      
    });        
}
  submit(){
    this.showprogress = true;
    let formdata={
      categoryid:this.newproductForm.controls["categoryid"].value,
        title:  this.newproductForm.controls["title"].value,
        brand: this.newproductForm.controls["brand"].value,
        description:this.newproductForm.controls["description"].value,
        price_mrp: this.newproductForm.controls["price_mrp"].value,  
        price:this.newproductForm.controls["price"].value,           
        available_size:this.newproductForm.controls["available_size"].value,
        available_colors:this.newproductForm.controls["available_colors"].value,
        unitsInStock:this.newproductForm.controls["unitsInStock"].value,
        setminorder:this.newproductForm.controls["setminorder"].value,
        product_available:this.newproductForm.controls["product_available"].value, 
        imagePath:this.imageurls,
    }

    if(this.editProdObj){            
      this.commonService.updateProduct(formdata,this.editProdObj._id).subscribe(res => {
        this.showStatusMessage(res);  
        this.newproductForm.markAsPristine();
        
      });
    }else{
      this.commonService.createProduct(formdata).subscribe(res => {         
        this.showStatusMessage(res);
        this.newproductForm.reset();
      });
    }
    // console.log("formdata: "+JSON.stringify(formdata,null,2))
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

