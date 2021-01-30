import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import 'firebase/database';
import { map } from 'rxjs/operators';
import 'firebase/firestore';
import { DocumentData, QuerySnapshot } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userEmail: string;
  enteredUserName: string;
  photoURL: string;
  userPhotoDefault: string = '../../../assets/img/user.png';
  isAdmin: boolean = false;

  constructor(private auth: AngularFireAuth) {
    this.auth.authState.subscribe((user) => {
      this.userEmail = user?.email;

      this.getAdmins().then((data) => {
        const adminsArray = data[0];
        if (adminsArray.includes(this.userEmail)) {
          this.isAdmin = true;
        } else {
          this.isAdmin = false;
        }
      });
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

  getAdmins(): Promise<string[]> {
    return firebase
      .firestore()
      .collection('admins')
      .get()
      .then((response: QuerySnapshot<DocumentData>) => {
        return response.docs.map((admin) => {
          return admin.data().admins;
        });
      });
  }
}
