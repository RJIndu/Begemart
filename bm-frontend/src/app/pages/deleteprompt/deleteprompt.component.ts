import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-deleteprompt',
  templateUrl: './deleteprompt.component.html',
  styleUrls: ['./deleteprompt.component.scss']
})
export class DeletepromptComponent implements OnInit {

  constructor(protected ref: NbDialogRef<DeletepromptComponent>) { }
  cancel() {
    this.ref.close("");
  }

  submit() {
    this.ref.close("Delete");
  }
  ngOnInit() {
  }

}
