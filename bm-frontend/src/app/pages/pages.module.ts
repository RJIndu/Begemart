import { NgModule } from '@angular/core';
import { NbMenuModule, NbCardBackComponent, NbCardComponent, NbCardModule, NbInputModule, NbButtonModule, NbActionsModule, NbUserModule, NbCheckboxModule, NbRadioModule, NbDatepickerModule, NbSelectModule, NbIconModule, NbLayoutModule, NbDialogModule, NbWindowModule, NbAccordionModule,NbSpinnerModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { ProductsComponent } from './products/products.component';
import { CustomersComponent } from './customers/customers.component';
import { ProductListComponent } from '../product-list/product-list.component';
import { NewproductComponent } from './newproduct/newproduct.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { ProductdetailsComponent } from './productdetails/productdetails.component';
import { MessagedialogComponent } from './messagedialog/messagedialog.component';

import { CategoriesComponent, FilterByPidPipe } from './categories/categories.component';
import { NewcategoryComponent } from './newcategory/newcategory.component';
import { CommonService } from '../common.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from '../interceptor/interceptor.service';
import { TableproductsComponent } from './tableproducts/tableproducts.component';
import { MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule, MatTreeModule } from '@angular/material';

const SERVICES = [
  CommonService
];

@NgModule({
  exports:[MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule],
  imports: [
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    ReactiveFormsModule,
  FormsModule,  
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    NbCardModule,
    NbLayoutModule,
    NbDialogModule.forChild(),
    NbWindowModule.forChild(),
    
    NbInputModule,
    NbCardModule,
    NbButtonModule,
    NbActionsModule,
    NbUserModule,
    NbCheckboxModule,
    NbRadioModule,
    NbDatepickerModule,    
    NbSelectModule,
    NbIconModule,
    NbAccordionModule,
    NbSpinnerModule
  ],
  declarations: [
    PagesComponent,
    ProductsComponent,
    CustomersComponent,ProductListComponent, 
    NewproductComponent, ProductdetailsComponent, 
    MessagedialogComponent, CategoriesComponent, NewcategoryComponent,FilterByPidPipe, TableproductsComponent
  ],
  providers: [
    ...SERVICES, 
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
      }
  ],
  entryComponents: [ MessagedialogComponent ]
  
  
})


export class PagesModule {
}
