import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { LoginService } from '../service/login.service';

import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
  }

  alertMessage = '';
  isAlertMessage = false;

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  login(){
    let username = this.loginForm.value.username ?? '';
    let password = this.loginForm.value.password ?? '';

    if(this.loginForm.valid){
      this.loginService.login(this.loginForm,
        (data) => {
          this.router.navigateByUrl('/list');
        },
        err => {
          this.loginService.logout();
          this.isAlertMessage = true;
          this.alertMessage = err.message;
        });
    }
  }
}
