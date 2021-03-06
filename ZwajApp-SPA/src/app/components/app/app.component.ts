import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'app';
  jwtHelper = new JwtHelperService();
  constructor(public authService: AuthService) { }

  ngOnInit() {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token) { this.authService.decodedToken = this.jwtHelper.decodeToken(token); }
    if (user) { this.authService.currentUser = JSON.parse(user); }

  }
}
