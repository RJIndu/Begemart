import { Component, OnInit, Input } from '@angular/core';
import { NbDialogService, NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-errordialog',
  templateUrl: './errordialog.component.html',
  styleUrls: ['./errordialog.component.scss']
})
export class ErrordialogComponent implements OnInit {
  @Input() data;
  constructor(protected ref: NbDialogRef<ErrordialogComponent>) { }

  ngOnInit() {
  }

}
