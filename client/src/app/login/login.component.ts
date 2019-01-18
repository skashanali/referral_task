import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserService } from '../services/user.service';

import { User } from '../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private loginForm: FormGroup;
  user = new User;
  isError: boolean;
  errorMsg: string;


  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get form() { return this.loginForm.controls; }
  
  getValue(control: string) {
    return this.loginForm.get(control).value;
  }

  onSubmit() {
    const { email, password } = this.loginForm.value;
    if (this.loginForm.invalid) {
      if (!email) this.form.email.markAsTouched();
      if (!password) this.form.password.markAsTouched();
    } else {
      this.user = {
        email,
        password
      };
      this.userService.login(this.user).subscribe((token: string) => {
        console.log('login successful', token);
        localStorage.setItem('authToken', token);
        this.router.navigate(['home']);
      }, err => {
        console.log('login error', err);
        this.isError = true;
        this.errorMsg = err.error.message;
      });
    }
  }

}
