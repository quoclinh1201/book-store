import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CommonUtils } from 'src/app/Common/CommonUtils';
import { LoginResponse } from 'src/app/Models/Response/LoginResponse';
import { Result } from 'src/app/Models/Result';
import { AuthService } from 'src/app/Services/auth.service';
import { CookiesService } from 'src/app/Services/cookies.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public username = new FormControl('', [
    Validators.required,
    Validators.maxLength(20),
  ]);
  public password = new FormControl('', [
    Validators.required,
    Validators.maxLength(20),
  ]);
  public confirmPassword = new FormControl('', [
    Validators.required,
    Validators.maxLength(20),
  ]);
  public usernameErr = '';
  public passwordErr = '';
  public confirmPasswordErr = '';
  public registerErr = '';

  constructor(
    private authService: AuthService,
    private commonUtils: CommonUtils,
    private cookieService: CookiesService
  ) {}

  ngOnInit(): void {}

  register() {
    if (this.username.valid) {
      this.usernameErr = '';
    } else {
      this.usernameErr = 'Vui lòng nhập tài khoản và không quá 20 kí tự';
    }

    if (this.password.valid) {
      this.passwordErr = '';
    } else {
      this.passwordErr = 'Vui lòng nhập mật khẩu và không quá 20 kí tự';
    }

    if (!this.confirmPassword.valid) {
      this.confirmPasswordErr =
        'Vui lòng nhập xác nhận mật khẩu và không quá 20 kí tự';
    } else if (this.confirmPassword.value !== this.password.value) {
      this.confirmPasswordErr = 'Xác nhận mật khẩu không khớp với mật khẩu';
    } else {
      this.confirmPasswordErr = '';
    }

    if (
      this.usernameErr === '' &&
      this.passwordErr === '' &&
      this.confirmPasswordErr === ''
    ) {
      this.authService.createAccount(this.username.value, this.password.value, this.confirmPassword.value).subscribe(data => {
        const response = this.commonUtils.keysToCamel(
          data
        ) as Result<LoginResponse>;
        this.cookieService.setCookie('token', response.content.token, 7);
        window.location.reload();
      },
      (err) => {
          this.registerErr = err.error.error.message;
      })
    }
  }
}
