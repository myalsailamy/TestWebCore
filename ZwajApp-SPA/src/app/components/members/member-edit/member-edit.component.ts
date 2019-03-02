
import { UserService } from 'src/app/services/User.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { User } from 'src/app/models/User';
import { NgForm } from '@angular/forms';
import { AlertifyService } from 'src/app/services/Alertify.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})

export class MemberEditComponent implements OnInit {
  user: User;
  @ViewChild('editForm') editForm: NgForm;
  constructor(private router: ActivatedRoute, private alertify: AlertifyService
    , private userService: UserService, private authService: AuthService) { }
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }
  ngOnInit() {
    this.router.data.subscribe(data => {
      this.user = data['user'];
    });
  }

  updateUser() {
    console.log(this.authService.decodedToken.nameid);
    this.userService.updateUser(this.authService.decodedToken.nameid, this.user).subscribe(() => {
      this.alertify.success('تم التعديل بنجاح');
      this.editForm.reset(this.user);
    }, error => {
      this.alertify.error(error);
    });
    console.log('Error');
  }

  updateMainPhoto(photoUrl: string) {
    this.user.photoURL = photoUrl;
  }
}
