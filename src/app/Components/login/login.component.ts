import { Component, OnInit } from '@angular/core';
import { CommonUtils } from 'src/app/Common/CommonUtils';
import { LoginResponse } from 'src/app/Models/Response/LoginResponse';
import { Result } from 'src/app/Models/Result';
import { AuthService } from 'src/app/Services/auth.service';
import { CookiesService } from 'src/app/Services/cookies.service';
import { FormControl, Validators } from '@angular/forms';
import { FacebookLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public username = new FormControl('');
  public password = new FormControl('');
  // public socialUser!: SocialUser;
  public errorMessage = '';

  constructor(
    private authService: AuthService,
    private commonUtils: CommonUtils,
    private cookieService: CookiesService,
    private socialAuthService: SocialAuthService
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

  loginWithFb() {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
    this.socialAuthService.authState.subscribe((user) => {
      this.authService.loginWithFb(user.id, user.name).subscribe(data => {
        const response = this.commonUtils.keysToCamel(
          data
        ) as Result<LoginResponse>;
        this.cookieService.setCookie('token', response.content.token, 7);
        window.location.reload();
      })
    });
  }
}
