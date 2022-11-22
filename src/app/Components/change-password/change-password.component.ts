import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CommonUtils } from 'src/app/Common/CommonUtils';
import { Result } from 'src/app/Models/Result';
import { AuthService } from 'src/app/Services/auth.service';
import { CookiesService } from 'src/app/Services/cookies.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {
  public oldPassword = new FormControl('', [
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
  public oldPasswordErr = '';
  public passwordErr = '';
  public confirmPasswordErr = '';
  public changePasswordErr = '';

  constructor(
    private authService: AuthService,
    private commonUtils: CommonUtils,
    private cookieService: CookiesService
  ) {}

  ngOnInit(): void {}

  changePassword() {
    if (this.oldPassword.valid) {
      this.oldPasswordErr = '';
    } else {
      this.oldPasswordErr = 'Vui lòng nhập mật khẩu cũ và không quá 20 kí tự';
    }

    if (this.password.valid) {
      this.passwordErr = '';
    } else {
      this.passwordErr = 'Vui lòng nhập mật khẩu mới và không quá 20 kí tự';
    }

    if (!this.confirmPassword.valid) {
      this.confirmPasswordErr =
        'Vui lòng nhập xác nhận mật khẩu mới và không quá 20 kí tự';
    } else if (this.confirmPassword.value !== this.password.value) {
      this.confirmPasswordErr = 'Xác nhận mật khẩu không khớp với mật khẩu mới';
    } else {
      this.confirmPasswordErr = '';
    }

    if (
      this.oldPasswordErr === '' &&
      this.passwordErr === '' &&
      this.confirmPasswordErr === ''
    ) {
      const token = this.cookieService.getCookie('token');
      this.authService.changePassword(token, this.oldPassword.value, this.password.value, this.confirmPassword.value).subscribe(data => {
        const response = this.commonUtils.keysToCamel(
          data
        ) as Result<boolean>;
        alert('Đổi mật khẩu thành công')
        window.location.reload();
      },
      (err) => {
          this.changePasswordErr = err.error.error.message;
      })
    }
  }
}
