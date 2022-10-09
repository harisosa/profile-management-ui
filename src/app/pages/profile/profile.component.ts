import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { UserModel } from 'src/app/models/register.model';
import { UserService } from 'src/app/services/user.service';
import Validation from 'src/app/utils/validator.utils';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import {AuthService} from '../../services/auth.service'
import { ModalComponent } from 'src/app/component/modal/modal.component';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  matDialogRef!: MatDialogRef<ModalComponent>;
  constructor(
    private userService : UserService,
    private formBuilder: FormBuilder,
    private authService :AuthService,
    private matDialog: MatDialog
    ) { }
   profile :UserModel =  new UserModel(null);
  faUser = faUser;
  profileForm!: FormGroup;
  get name() {
    return this.profileForm.get('name')!;
  }

  get phone() {
    return this.profileForm.get('phone')!;
  }

  get password(){
    return this.profileForm.get('password')!;
  }

  get confirmPassword(){
    return this.profileForm.get('confirmPassword')!;
  }

  onLogut(){
    this.authService.logout()
  }

  ngOnInit(): void {

    this.profileForm = this.formBuilder.group(
      {
        name: ['',[Validators.required]],
        phone:['',[Validators.required,Validators.pattern("^[0-9]*$"),Validators.maxLength]],
        password: ['',],
        confirmPassword: ['']
      },
      {
        validators: [Validation.match('password', 'confirmPassword')],
      }
    );
    //let user = JSON.parse(localStorage.getItem('user'))
    this.userService.getProfile("a25cb35e-955d-40d1-939a-7a130d21387c").subscribe(returnVal=> {
      if(returnVal){
        this.profile = new UserModel(returnVal.data) ;
        this.profileForm.get('name')?.setValue(this.profile.fullname)
        this.profileForm.get('phone')?.setValue(this.profile.phone)
      }
    } )
  }
  onSubmit(){
    this.profile.fullname = this.name.value;
    this.profile.phone = this.phone.value;
    if (this.password.value){
      this.profile.password = this.password.value;
    }
    this.userService.updateProfile(this.profile).subscribe(x=> {
      Notify.success(x.message);
      this.ngOnInit()
    },(err) => {
      Notify.failure(err.error.message)
    }
    )
  }

  validate(): void {
    if (this.profileForm.invalid) {
      for (const control of Object.keys(this.profileForm.controls)) {
        this.profileForm.controls[control].markAsTouched();
      }
      return;
    }
  }

  OpenModal() {
    this.matDialogRef = this.matDialog.open(ModalComponent, {
      panelClass: 'modal-class',
      data: { 
        title: 'Confirmation' ,
        subtitle : 'Are you sure wanna update your data?',
      },
      disableClose: true
    });

    this.matDialogRef.afterClosed().subscribe(res => {
      if ((res == true)) {
       this.onSubmit() 
      }
    });
  }

}
