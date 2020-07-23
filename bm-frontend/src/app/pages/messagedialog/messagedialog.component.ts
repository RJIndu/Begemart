import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-messagedialog',
  templateUrl: './messagedialog.component.html',
  styleUrls: ['./messagedialog.component.scss']
})
export class MessagedialogComponent implements OnInit {
  @Input() messageObj;
  constructor(protected ref: NbDialogRef<MessagedialogComponent>) { }

  ngOnInit() {
  }

}
