import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { LoginService } from '../service/login.service';

import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class RegisterComponent implements OnInit {
  
  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
  }

  alertMessage = '';
  isAlertMessage = false;

  registerForm = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  register(){
    let username = this.registerForm.value.username ?? '';
    let email = this.registerForm.value.email ?? '';
    let password = this.registerForm.value.password ?? '';

    if(this.registerForm.valid){
      this.loginService.register(this.registerForm,
        (data) => {
          this.router.navigateByUrl('/login');
        },
        err => {
          this.isAlertMessage = true;
          this.alertMessage = err.message;
        });
    }
  }
}
