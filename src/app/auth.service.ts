import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  warningText: string;

  constructor(private auth: AngularFireAuth, private router: Router) {}

  addNewUser(userInfoControl) {
    const { email, password } = userInfoControl.value;
    if (
      userInfoControl.value['password'] ===
      userInfoControl.value['passwordConfirm']
    )
      if (userInfoControl.value['password'].length >= 6) {
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

  loginUser(loginControl) {
    const { email, password } = loginControl.value;
    this.auth.signInWithEmailAndPassword(email, password).then(() => {
      this.router.navigate(['']);
    });
    // this.warningText = 'User with such email is not exist';
  }
}
