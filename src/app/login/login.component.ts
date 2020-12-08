import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  warningText: string;

  constructor() {}

  ngOnInit(): void {}

  getInfo($event, email, password): void {
    $event.preventDefault();
    if (email) {
      if (password) {
        location.href = '/home';
      } else {
        this.warningText = 'Enter your password';
      }
    } else {
      this.warningText = 'Enter your email';
    }
  }
}
