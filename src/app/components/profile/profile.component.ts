import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  photo: string;
  userEmail: string;
  constructor(public authService: AuthService, private auth: AngularFireAuth) {}

  ngOnInit(): void {
    this.photo = this.authService.userPhotoDefault;
    this.auth.authState.subscribe((user) => {
      this.userEmail = user?.email;
    });
  }
}
