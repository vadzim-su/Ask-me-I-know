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

  addNewUserService(userInfoControl) {
    return this.auth.createUserWithEmailAndPassword(
      userInfoControl['email'],
      userInfoControl['password']
    );
  }

  loginWithGoogleService() {
    let provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider);
  }

  loginWithFacebookService() {
    let provider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(provider);
  }

  loginWithGithubService() {
    let provider = new firebase.auth.GithubAuthProvider();
    return firebase.auth().signInWithPopup(provider);
  }

  loginUserService(loginControl) {
    return this.auth.signInWithEmailAndPassword(
      loginControl['email'],
      loginControl['password']
    );
  }

  signOut() {
    return this.auth.signOut();
  }

  getDatabaseService() {
    return firebase.database().ref('/categories').get();
  }

  async getCategoriesService() {
    const response = await fetch(
      'https://vadzim-su.github.io/Ask-me-I-know/src/app/homepage/categories.json'
    );
    return response;
  }
}