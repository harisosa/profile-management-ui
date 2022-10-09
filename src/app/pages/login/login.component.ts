import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginModel } from 'src/app/models/login.models';
import { AuthService } from 'src/app/services/auth.service';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Router } from '@angular/router';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('shrinkOut', [
      state('in', style({ height: '*' })),
      transition('* => void', [
        style({ height: '*' }),
        animate(250, style({ height: 0 }))
      ])
    ])
  ]
})
export class LoginComponent implements OnInit {
  LoginForm!: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private authService : AuthService,
    private router : Router) {}


  get username() {
    return this.LoginForm.get('username')!;
  }

  get password(){
    return this.LoginForm.get('password')!;
  }
  ngOnInit(): void {
    this.LoginForm = this.formBuilder.group(
      {
        username: ['',[Validators.required]],
        password: ['',[Validators.required]],
      },
    );
  }
  onRegister(){
    this.router.navigate(['/register'])
  }
  onSubmit(){
      this.validate();
      if(!this.LoginForm.invalid)
      {
        let username = this.LoginForm.controls['username'].value
        let password = this.LoginForm.controls['password'].value

        let user = new LoginModel(username,password)
        this.authService.Login(user).subscribe(returnVal=> {
          if (returnVal) {
            let currentUser = returnVal.data;
            console.log(currentUser)
            localStorage.setItem("user", JSON.stringify(currentUser));
            Notify.success('Login Sucessfull');
            this.router.navigate(['/profile'])
          }

        },(err) => {
          Notify.failure(err.error.message);
        }
        )
      }


     
  }
  validate(): void {
    if (this.LoginForm.invalid) {
      for (const control of Object.keys(this.LoginForm.controls)) {
        this.LoginForm.controls[control].markAsTouched();
      }
      return;
    }
  }

}
