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
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginControl: FormGroup;
  warningText: string;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.loginControl = this.fb.group({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  loginUser() {
    this.authService
      .loginUserService(this.loginControl.value)
      .then(() => {
        this.router.navigate(['']);
      })
      .catch((data) => {
        this.warningText = data?.message || 'server error';
      });
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
