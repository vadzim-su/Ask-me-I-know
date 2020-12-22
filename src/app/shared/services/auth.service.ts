import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import 'firebase/database';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  warningText: string;

  constructor(private auth: AngularFireAuth, private router: Router) {}

  addNewUserService(userInfoControl): any {
    return this.auth.createUserWithEmailAndPassword(
      userInfoControl['email'],
      userInfoControl['password']
    );
  }

  loginWithGoogleService(): any {
    let provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider);
  }

  loginWithFacebookService(): any {
    let provider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(provider);
  }

  loginWithGithubService(): any {
    let provider = new firebase.auth.GithubAuthProvider();
    return firebase.auth().signInWithPopup(provider);
  }

  loginUserService(loginControl): any {
    return this.auth.signInWithEmailAndPassword(
      loginControl['email'],
      loginControl['password']
    );
  }

  signOut(): any {
    return this.auth.signOut();
  }

  // getDatabaseService() {
  //   return firebase.database().ref('/categories').get();
  // }

  // async getCategoriesService() {
  //   const response = await fetch(
  //     'https://vadzim-su.github.io/Ask-me-I-know/src/app/homepage/categories.json'
  //   );
  //   return response;
  // }
}
