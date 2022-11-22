import { Component, OnInit } from '@angular/core';
import { CommonUtils } from 'src/app/Common/CommonUtils';
import { LoginResponse } from 'src/app/Models/Response/LoginResponse';
import { Result } from 'src/app/Models/Result';
import { AuthService } from 'src/app/Services/auth.service';
import { CookiesService } from 'src/app/Services/cookies.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public username = new FormControl('');
  public password = new FormControl('');

  public errorMessage = '';

  constructor(
    private authService: AuthService,
    private commonUtils: CommonUtils,
    private cookieService: CookiesService
  ) {}

  ngOnInit(): void {}

  login() {
    this.authService.login(this.username.value, this.password.value).subscribe(
      (data) => {
        const response = this.commonUtils.keysToCamel(
          data
        ) as Result<LoginResponse>;
        this.cookieService.setCookie('token', response.content.token, 7);
        window.location.reload();
      },
      (err) => {
          this.errorMessage = err.error.error.message;
      }
    );
  }
}
