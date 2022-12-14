import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CommonUtils } from 'src/app/Common/CommonUtils';
import { GetOwnProfileResponse } from 'src/app/Models/Response/GetOwnProfileResponse';
import { Result } from 'src/app/Models/Result';
import { CookiesService } from 'src/app/Services/cookies.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  // public profile!: GetOwnProfileResponse;
  public isEditMode = false;
  public isChangeAvtMode = false;
  public file!:File;
  public fullname = new FormControl({value:'', disabled: true}, [Validators.maxLength(50)]);
  public email = new FormControl({value:'', disabled: true}, [Validators.maxLength(50), Validators.email]);
  public phone = new FormControl({value:'', disabled: true}, [Validators.maxLength(10), Validators.minLength(10), Validators.pattern("[0]{1}[0-9]{9}")]);
  public gender = new FormControl({value:true, disabled: true}, Validators.required);
  public isFacebookAccount = false;
  public avatarUrl = '';
  public fullnameErr = '';
  public emailErr = '';
  public phoneErr = '';

  constructor(
    private cookieService: CookiesService,
    private userService: UserService,
    private commonUtils: CommonUtils,
  ) { }

  ngOnInit(): void {
    this.getProfile();
  }

  getProfile() {
    const token = this.cookieService.getCookie('token');
    this.userService.getProfile(token).subscribe(data => {
      const response = this.commonUtils.keysToCamel(data) as Result<GetOwnProfileResponse>;
      // this.profile = response.content;
      this.fullname.setValue(response.content.fullName);
      this.email.setValue(response.content.email);
      this.phone.setValue(response.content.phoneNumber);
      this.gender.setValue(response.content.gender);
      this.avatarUrl = response.content.avatarUrl;
      this.isFacebookAccount = response.content.isFacebookAccount;
    })
  }

  updateProfile() {
    if(this.fullname.valid) {
      this.fullnameErr = '';
    } else {
      this.fullnameErr = 'H??? v?? t??n kh??ng qu?? 50 k?? t???';
    }

    if(this.email.valid) {
      this.emailErr = '';
    } else {
      this.emailErr = 'Email kh??ng qu?? 50 k?? t??? v?? c?? ?????nh d???ng abc@def.ghi';
    }

    if(this.phone.valid) {
      this.phoneErr = '';
    } else {
      this.phoneErr = 'S??? ??i???n tho???i ph???i ????ng ?????nh d???ng 0xxxxxxxxx';
    }

    if(this.fullnameErr === '' && this.phoneErr === '' && this.emailErr === '') {
      const token = this.cookieService.getCookie('token');
      this.userService.updateProfile(token, this.fullname.value, this.email.value, this.phone.value, this.gender.value).subscribe(data => {
        const response = this.commonUtils.keysToCamel(data) as Result<GetOwnProfileResponse>;
        this.fullname.setValue(response.content.fullName);
        this.email.setValue(response.content.email);
        this.phone.setValue(response.content.phoneNumber);
        this.gender.setValue(response.content.gender);
        this.avatarUrl = response.content.avatarUrl;
        this.isFacebookAccount = response.content.isFacebookAccount;
        alert('C???p nh???t th??ng tin c?? nh??n th??nh c??ng');
        this.cancelEdit();
      })
    }

  }

  changeToEditMode() {
    this.isEditMode = true;
    this.fullname.enable();
    this.email.enable();
    this.phone.enable();
    this.gender.enable();
  }

  changeAvtMode() {
    this.isChangeAvtMode = true;
  }

  cancelChangeAvt() {
    this.isChangeAvtMode = false;
  }

  onFileSelected(event:any) {
    this.file = event.target.files[0];
  }

  updateAvt() {
    const token = this.cookieService.getCookie('token');
      this.userService.changeAvatar(token, this.file).subscribe(data => {
        const response = this.commonUtils.keysToCamel(data) as Result<GetOwnProfileResponse>;
        caches.delete(response.content.avatarUrl.substring(response.content.avatarUrl.lastIndexOf("/") + 1));
        // this.fullname.setValue(response.content.fullName);
        // this.email.setValue(response.content.email);
        // this.phone.setValue(response.content.phoneNumber);
        // this.gender.setValue(response.content.gender);
        // this.avatarUrl = response.content.avatarUrl;
        // this.isFacebookAccount = response.content.isFacebookAccount;
        alert('C???p nh???t avatar th??nh c??ng');
        window.location.reload();
        // this.isChangeAvtMode = false;
      })
  }

  cancelEdit() {
    this.isEditMode = false;
    this.fullname.disable();
    this.email.disable();
    this.phone.disable();
    this.gender.disable();
    this.fullnameErr = '';
    this.phoneErr = '';
     this.emailErr = '';
  }
}
