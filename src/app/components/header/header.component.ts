import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(public authService: AuthService, private router: Router) {}
  defaultPhoto: string;

  ngOnInit(): void {
    this.defaultPhoto = this.authService.userPhotoDefault;
  }

  onLogout(): void {
    this.authService.signOut().then(() => {
      this.router.navigate(['login']);
    });
  }
}
