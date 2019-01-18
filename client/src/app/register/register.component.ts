import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserService } from '../services/user.service';
import { ReferralService } from '../services/referral.service';

import { User } from '../models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  private registerForm: FormGroup;
  user = new User;
  referralCode: string;
  signupSuccessful: boolean;

  constructor(private userService: UserService, private formBuilder: FormBuilder, private referralService: ReferralService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      phone_number: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      email: ['', [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      referral_code: ['']
    });
  }

  get form() { return this.registerForm.controls; }

  getValue(control: string) {
    return this.registerForm.get(control).value;
  }

  onSubmit() {
    const { first_name, last_name, phone_number, email, password, referral_code } = this.registerForm.value;
    if (this.registerForm.invalid) {
      if (!first_name) this.form.first_name.markAsTouched();
      if (!last_name) this.form.last_name.markAsTouched();
      if (!phone_number) this.form.phone_number.markAsTouched();
      if (!email) this.form.email.markAsTouched();
      if (!password) this.form.password.markAsTouched();
    } else {
      this.user = {
        first_name,
        last_name,
        phone_number,
        email,
        password
      };
      this.userService.create(this.user).subscribe((_id: string) => {
        console.log('user registration successful', _id);
        if (referral_code)
          this.referralService.addUserInReferral(referral_code, _id);
        let userDetails = { first_name, last_name, _id };
        this.referralService.generate(userDetails).subscribe((code: string) => {
          console.log('referral code generaton successful', _id);
          this.referralCode = code;
          this.registerForm.reset();
          this.signupSuccessful = true;
        }, err => {
          console.log('referral code generaton error', err);
        });
      }, err => {
        console.log('user registration error', err);
      });
    }
  }

  checkEmailExists() {
    let email = this.getValue('email');
    if (email) {
      this.userService.exists(email).subscribe(res => {
        console.log('valid email', res);
      }, err => {
        console.log('check email error', err);
        this.form.email.setErrors({ 'exists': true });
      })
    }
  }

  checkReferralCode() {
    let code = this.getValue('referral_code');
    if (code) {
      this.referralService.check(code).subscribe(res => {
        console.log('valid referral code');
      }, err => {
        console.log('check referral code error', err);
        this.form.referral_code.setErrors({ 'invalid': true })
      })
    }
  }

}
