import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  warningText: string;

  loginControl: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AngularFireAuth,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginControl = this.fb.group({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  loginUser() {
    const { email, password } = this.loginControl.value;
    this.auth.signInWithEmailAndPassword(email, password).then(() => {
      this.router.navigate(['']);
    });
    // console.log(this.loginControl.value);
    // location.href = '';
    // this.warningText = 'User with such email is not exist';
  }
}
