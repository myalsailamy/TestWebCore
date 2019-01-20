import { AlertifyService } from 'src/app/services/Alertify.service';
import { UserService } from 'src/app/services/User.service';
import { User } from 'src/app/models/User';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  user: User;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(private userService: UserService, private alertfiy: AlertifyService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    // this.loadUser();
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });

    this.galleryOptions = [
      {
        width: '500px', height: '500px', imagePercent: 100, thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide, preview: false
      }
    ];

    this.galleryImages = this.getImages();
  }

  getImages() {
    const imagesUrls = [];
    for (let index = 0; index < this.user.photos.length; index++) {
      imagesUrls.push({
        small: this.user.photos[index].url,
        medium: this.user.photos[index].url,
        big: this.user.photos[index].url
      });
    }
    return imagesUrls;
  }

  // loadUser() {
  //   this.userService.getUser(+this.route.snapshot.params['id']).subscribe(
  //     (user: User) => { this.user = user; },
  //     error => { this.alertfiy.error(error) }
  //   )
  // }



}
