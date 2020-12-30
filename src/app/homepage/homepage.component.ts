import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  constructor(private router: Router, public authService: AuthService) {}
  userEmail: string;

  ngOnInit(): void {
    this.userEmail = this.authService.userEmail;
  }

  onLogout(): void {
    this.authService.signOut().then(() => {
      this.router.navigate(['login']);
    });
  }
}
