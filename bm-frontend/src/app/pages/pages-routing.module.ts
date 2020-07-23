import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { ProductsComponent } from './products/products.component';
import { NewproductComponent } from './newproduct/newproduct.component';
import { ProductdetailsComponent } from './productdetails/productdetails.component';
import { CategoriesComponent } from './categories/categories.component';
import { NewcategoryComponent } from './newcategory/newcategory.component';
import { TableproductsComponent } from './tableproducts/tableproducts.component';


const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'categories',
      component: CategoriesComponent      
    },
    {
      path: 'tableproducts',
      component: TableproductsComponent      
    },
    {
      path: 'newcategory',
      component: NewcategoryComponent      
    },
    {
      path: 'products',
      component: ProductsComponent      
    },
    {
      path: 'newproduct',
      component: NewproductComponent,
    },
    {
      path: 'productdetails',
      component: ProductdetailsComponent,
    },    
    {
      path: '',
      redirectTo: 'products',
      pathMatch: 'full',
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
