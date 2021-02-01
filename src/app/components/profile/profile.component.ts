import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  defaultPhoto: string;
  userQuestions: number | string;
  constructor(public authService: AuthService, private auth: AngularFireAuth) {}

  ngOnInit(): void {
    this.defaultPhoto = this.authService.userPhotoDefault;
    this.userQuestions = this.userQuestions || '-';
  }
}
