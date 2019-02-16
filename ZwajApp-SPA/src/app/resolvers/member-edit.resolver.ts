import { AuthService } from './../services/auth.service';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { AlertifyService } from 'src/app/services/Alertify.service';
import { UserService } from './../services/User.service';
import { User } from 'src/app/models/User';
import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class MemberEditResolver implements Resolve<User> {
    constructor(private userService: UserService, private authService: AuthService,
         private router: Router, private alertiy: AlertifyService) { }
    resolve(route: ActivatedRouteSnapshot): Observable<User> {
        return this.userService.getUser(this.authService.decodedToken.nameid).pipe(
            catchError(error => {
                this.alertiy.error('يوجد مشكلة في عرض البيانات');
                this.router.navigate(['/members']);
                return of(null);
            })
        );
    }
}