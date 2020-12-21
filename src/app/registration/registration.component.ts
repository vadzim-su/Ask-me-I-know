import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {
  userInfoControl: FormGroup;
  warningText: string;

  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    public router: Router
  ) {}

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
    if (
      this.userInfoControl.value['password'] ===
      this.userInfoControl.value['passwordConfirm']
    )
      if (this.userInfoControl.value['password'].length >= 6) {
        this.authService
          .addNewUserService(this.userInfoControl.value)
          .then(() => this.router.navigate(['']))
          .catch((data) => {
            this.warningText = data?.message || 'server error';
          });
      } else {
        this.warningText = 'Your password should be 6-char';
      }
    else {
      this.warningText = 'Entered passwords are not the same';
    }
  }

  loginWithGoogle() {
    this.authService
      .loginWithGoogleService()
      .then(() => {
        this.router.navigate(['']);
      })
      .catch((data) => {
        this.warningText = data?.message || 'server error';
      });
  }

  loginWithFacebook() {
    this.authService
      .loginWithFacebookService()
      .then(() => {
        this.router.navigate(['']);
      })
      .catch((data) => {
        this.warningText = data?.message || 'server error';
      });
  }

  loginWithGithub() {
    this.authService
      .loginWithGithubService()
      .then(() => {
        this.router.navigate(['']);
      })
      .catch((data) => {
        this.warningText = data?.message || 'server error';
      });
  }
}
