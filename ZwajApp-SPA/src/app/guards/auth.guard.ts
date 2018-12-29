import { AlertifyService } from './../services/Alertify.service';
import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authservice: AuthService, private router: Router, private alertify: AlertifyService) { }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authservice.loggedIn()) {
      return true;
    }

    this.alertify.error('يجب تسجيل الدخول اولاً.');
    this.router.navigate(['home']);
    return false;

  }
}
