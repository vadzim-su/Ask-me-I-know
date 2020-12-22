import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  constructor(private router: Router, public authService: AuthService) {}
  userLogin: string;
  @Input() loginControl: FormGroup;
  ngOnInit(): void {}

  onLogout(): void {
    this.authService.signOut().then(() => {
      this.router.navigate(['login']);
    });
  }
}
