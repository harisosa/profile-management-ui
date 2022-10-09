import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

import { Component, EventEmitter, Inject, Input, Output, } from '@angular/core';

@Component({
  selector: 'modal-component',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Input()
  title : string = '';
  subtitle : string ='';

  @Output()
  onOk : EventEmitter<any> = new EventEmitter();
  constructor(
    private _mdr: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) data: any
  ) 
  {
      this.title = data.title;
      this.subtitle = data.subtitle;
  }

  CloseDialog() {
    this._mdr.close(false)
  }
}
