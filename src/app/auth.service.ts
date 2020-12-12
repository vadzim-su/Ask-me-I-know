import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // user: Observable<firebase.User>;
  // constructor(private firebaseAuth: AngularFireAuth) {
  //   this.user = firebaseAuth.authState;
  // }
  // signup(email: string, password: string) {
  //   this.firebaseAuth.auth
  //     .createUserWithEmailAndPassword(email, password)
  //     .then((value) => {
  //       console.log('Success!', value);
  //     })
  //     .catch((err) => {
  //       console.log('Something went wrong:', err.message);
  //     });
  // }
}
