import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../environments/environment';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private initProductList = new BehaviorSubject<[]>([]);
  private initProductList$ = this.initProductList.asObservable();
  private initCategoryList = new BehaviorSubject<[]>([]);
  private initCategoryList$ = this.initCategoryList.asObservable();
  
  constructor(public router: Router, private http: HttpClient) {
    
  }

  setInitProductList(productListObj) {
    this.initProductList.next(productListObj);        
  }

  getInitProductList(): Observable<[]> {
      return this.initProductList$;
  }

  setInitCategoryList(categoryListObj) {
    this.initCategoryList.next(categoryListObj);        
  }

  getInitCategoryList(): Observable<[]> {
      return this.initCategoryList$;
  }

  getAllProducts(): Observable<any> {
    return this.http.get(environment.apiURL + 'products').pipe(retry(3));
}

  deleteProduct(pid): Observable<any> {
  return this.http.delete(environment.apiURL + 'products/'+pid).pipe(retry(3));
}

createProduct(obj): Observable<any> {
  const headers = { 'Content-Type': 'application/json'}
  // console.log("prodObj: "+JSON.stringify(obj,null,2));
  return this.http.post(environment.apiURL + "products", obj, { headers }).pipe(retry(3));
}

updateProduct(obj,id): Observable<any> {
  const headers = { 'Content-Type': 'application/json'}
  return this.http.put(environment.apiURL + "products/"+id, obj, { headers }).pipe(retry(3));
}

getAllCategories(): Observable<any> {
  return this.http.get(environment.apiURL + 'categories').pipe(retry(3));
}

deleteCategories(id): Observable<any> {
return this.http.delete(environment.apiURL + 'categories/'+id).pipe(retry(3));
}

createCategory(obj): Observable<any> {
  const headers = { 'Content-Type': 'application/json'}
  console.log("categories obj: "+JSON.stringify(obj,null,2));
  return this.http.post(environment.apiURL + "categories", obj, { headers }).pipe(retry(3));
}

updateCategory(obj,id): Observable<any> {
  const headers = { 'Content-Type': 'application/json'}
  return this.http.put(environment.apiURL + "categories/"+id, obj, { headers }).pipe(retry(3));
}

}
