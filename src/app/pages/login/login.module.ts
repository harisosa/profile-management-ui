import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    LoginComponent
    
  ],
  imports: [
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ]
})
export class LoginModule { }
