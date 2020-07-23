import { Injectable } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { ErrordialogComponent } from '../errordialog/errordialog.component';

@Injectable({
  providedIn: 'root'
})
export class ErrordialogService {

  public isDialogOpen: Boolean = false;
    constructor(private dialogService: NbDialogService) { }
    openDialog(data): any {
      this.dialogService.open(
        ErrordialogComponent,
        {
          context: {
            data:data
          },
          closeOnEsc: false,
        }).onClose.subscribe(res => {
          // this.showprogress = false;
        });
    }
}
