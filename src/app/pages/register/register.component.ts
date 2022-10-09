
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginModel } from 'src/app/models/login.models';
import { AuthService } from 'src/app/services/auth.service';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { NgxSpinnerService } from "ngx-spinner";
import Validation from 'src/app/utils/validator.utils';
import { UserModel } from 'src/app/models/register.model';
import { Router } from '@angular/router';
/*
 email: string
    phone: string
    password: string*/
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private authService : AuthService,
    private router : Router) {}


  get name() {
    return this.registerForm.get('name')!;
  }

  get email() {
    return this.registerForm.get('email')!;
  }
  get phone() {
    return this.registerForm.get('phone')!;
  }

  get password(){
    return this.registerForm.get('password')!;
  }

  get confirmPassword(){
    return this.registerForm.get('confirmPassword')!;
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group(
      {
        name: ['',[Validators.required]],
        email:['',[Validators.required,Validators.email]],
        phone:['',[Validators.required,Validators.pattern("^[0-9]*$"),Validators.maxLength]],
        password: ['',[Validators.required]],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: [Validation.match('password', 'confirmPassword')],
      }
    );
  }
  goToLogin(){
    this.router.navigate(['/login'])
  }
  onSubmit(){
      this.validate();
      if(!this.registerForm.invalid)
      {
        const user = new UserModel(this.registerForm.value)
        this.authService.Register(user).subscribe(x=> {
          Notify.success('Register Sucessfull');
          this.router.navigate(['/login'])
        },
        (err) => {
          Notify.failure(err.error.message);
        })
      }
    }
    validate(): void {
      if (this.registerForm.invalid) {
        for (const control of Object.keys(this.registerForm.controls)) {
          this.registerForm.controls[control].markAsTouched();
        }
        return;
      }
    }


     
}
