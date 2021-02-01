import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { FilterService } from './shared/services/filter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    public authService: AuthService,
    public filterService: FilterService
  ) {}

  ngOnInit(): void {}
}
