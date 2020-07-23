import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ErrordialogService } from './errordialog.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService {
  constructor(public errorDialogService: ErrordialogService) { }

  
  
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    return next.handle(request)
       .pipe(
         catchError( (error: HttpErrorResponse) => { 
            let errMsg = '';
            // Client Side Error
            if (error.error instanceof ErrorEvent) {        
              errMsg = `Client side Error: ${error.error.message}`;
            } 
            else {  // Server Side Error
              errMsg = `Server Side Error Code: ${error.status},  Message: ${error.message}`;
            }
            return throwError(errMsg);
          })
       )
  }
    // intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //     console.log("Inside interceptor");
    //     return next.handle(request).pipe(
    //         map((event: HttpEvent<any>) => {
    //             if (event instanceof HttpResponse) {
    //                 console.log('event--->>>', event);
    //             }
    //             return event;
    //         }),
    //         catchError((error: HttpErrorResponse) => {
    //             console.log("Error occured "+JSON.stringify(error,null,2));
    //             let data = {};
    //             data = {
    //                 message: error && error.error && error.error.reason ? error.error.reason : '',
    //                 status: error.status
    //             };
    //             this.errorDialogService.openDialog(data);
    //             return throwError(error);
    //         }));
    // }
}
