import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal.component';
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";



@NgModule({
  declarations: [ModalComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule
  ],
  exports : [ModalComponent]
})
export class ModalModule { }
