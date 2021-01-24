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
  photo: string;
  userEmail: string;

  ngOnInit(): void {
    this.authService.getAuthState().subscribe((useremail) => {
      this.userEmail = useremail;
    });
    this.photo = this.authService.userPhotoDefault;
  }

  onLogout(): void {
    this.authService.signOut().then(() => {
      this.router.navigate(['login']);
    });
  }
}
