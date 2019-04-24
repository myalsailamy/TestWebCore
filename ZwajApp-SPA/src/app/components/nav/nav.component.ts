import { AlertifyService } from './../../services/Alertify.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  photoUrl: string;
  constructor(public authService: AuthService, private alertify: AlertifyService, private router: Router) { }

  ngOnInit() {
    this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
  }

  login() {
    this.authService.login(this.model).subscribe(
      next => { this.alertify.success('تم الدخول بنجاح.'); },
      error => { this.alertify.error(error); },
      () => { this.router.navigate(['/members']); }
    );
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    this.authService.currentUser = null;
    localStorage.removeItem('user');
    this.alertify.message('تم الخروج');
    this.router.navigate(['/home']);
  }

}
