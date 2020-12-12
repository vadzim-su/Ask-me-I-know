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
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  warningText: string;
  userInfoControl: FormGroup;
  constructor(
    private fb: FormBuilder,
    private auth: AngularFireAuth,
    private router: Router
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
    const { email, password } = this.userInfoControl.value;
    if (
      this.userInfoControl.value['password'] ===
      this.userInfoControl.value['passwordConfirm']
    )
      if (this.userInfoControl.value['password'].length >= 6) {
        this.auth
          .createUserWithEmailAndPassword(email, password)
          .then(() => this.router.navigate(['']));
      } else {
        this.warningText = 'Your password should be 6-char';
      }
    else {
      this.warningText = 'Entered passwords are not the same';
    }
  }
}
