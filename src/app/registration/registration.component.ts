import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {
  userInfoControl: FormGroup;
  warningText: string;

  constructor(private fb: FormBuilder, public authService: AuthService) {}

  ngOnInit(): void {
    this.userInfoControl = this.fb.group({
      username: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9_-]{3,}/),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._-]+@[a-z]+\.[a-z]{2,3}$/),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9]{5,}/),
      ]),
      passwordConfirm: new FormControl('', [Validators.required]),
    });
  }

  addNewUser() {
    this.authService.addNewUser(this.userInfoControl);
  }
}
