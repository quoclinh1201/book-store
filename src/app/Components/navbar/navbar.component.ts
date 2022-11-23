import { Component, OnInit } from '@angular/core';
import { CookiesService } from 'src/app/Services/cookies.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public isLogedIn = false;
  constructor(private cookieService: CookiesService) { }

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser() {
    const token = this.cookieService.getCookie('token');
    if(token !== '') {
      this.isLogedIn = true;
    }
    else {
      this.isLogedIn = false;
    }
  }

  logout() {
    this.cookieService.deleteCookie('token');
    window.location.reload();
  }
}
