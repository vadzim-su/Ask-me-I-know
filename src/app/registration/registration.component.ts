import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  warningText: string;

  constructor() {}

  ngOnInit(): void {}

  isValidEnteredData(
    $event,
    username,
    email,
    password,
    confirmedPassword
  ): void {
    $event.preventDefault();

    if (/^[a-zA-Z0-9_-]{3,}/.test(username)) {
      if (/^[a-zA-Z0-9._-]+@[a-z]+\.[a-z]{2,3}$/.test(email)) {
        if (/^[a-zA-Z0-9]{5,}/.test(password)) {
          if (password === confirmedPassword) {
            location.href = '/home';
          } else {
            this.warningText = 'Entered passwords are not the same';
          }
        } else {
          this.warningText = 'Your password is not valid';
        }
      } else {
        this.warningText = 'Your email is not valid';
      }
    } else {
      this.warningText = 'Your username is not valid';
    }
  }
}
