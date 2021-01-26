import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import 'firebase/database';
import { map } from 'rxjs/operators';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userEmail: string;
  enteredUserName: string;
  photoURL: string;
  userPhotoDefault: string = '../../../assets/img/user.png';

  constructor(private auth: AngularFireAuth) {
    this.auth.authState.subscribe((user) => {
      this.userEmail = user?.email;
    });
  }

  addNewUserService(userInfoControl): any {
    return this.auth.createUserWithEmailAndPassword(
      userInfoControl['email'],
      userInfoControl['password']
    );
  }

  loginWithGoogleService(): Promise<firebase.auth.UserCredential> {
    let provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider);
  }

  loginWithFacebookService(): Promise<firebase.auth.UserCredential> {
    let provider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(provider);
  }

  loginWithGithubService(): Promise<firebase.auth.UserCredential> {
    let provider = new firebase.auth.GithubAuthProvider();
    return firebase.auth().signInWithPopup(provider);
  }

  loginUserService(loginControl): any {
    return this.auth.signInWithEmailAndPassword(
      loginControl['email'],
      loginControl['password']
    );
  }

  getAuthState() {
    return this.auth.authState.pipe(
      map((user) => {
        this.userEmail = user?.email;
        return this.userEmail;
      })
    );
  }

  signOut(): any {
    return this.auth.signOut();
  }
}
