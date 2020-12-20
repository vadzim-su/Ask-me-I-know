import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import 'firebase/database';
import * as $ from 'jquery';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  question: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public authService: AuthService // db: AngularFireDatabase,
  ) {}

  ngOnInit(): void {
    this.question = this.fb.group({
      title: new FormControl('', [Validators.required]),
      text: new FormControl('', [Validators.required]),
      tags: new FormControl([], [Validators.required]),
    });
  }

  onLogout() {
    this.authService.signOut().then(() => {
      this.router.navigate(['login']);
    });
  }

  getDatabase() {
    console.log(this.authService.getDatabaseService());
  }

  closeModal() {
    // $('#exampleModal').modal('toggle');
  }

  // getCategories() {
  //   fetch('./categories.json')
  //     .then((data) => data.json())
  //     .then((data) => console.log(data));
  // }
}
