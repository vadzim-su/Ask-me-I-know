import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  constructor(private auth: AngularFireAuth, private router: Router) {}
  ngOnInit(): void {}

  onLogout() {
    this.auth.signOut().then(() => {
      this.router.navigate(['login']);
    });
  }
}
