import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Question from '../../models/question.model';
import { AuthService } from '../../shared/services/auth.service';
import { QuestionService } from '../../shared/services/question.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  constructor(
    private router: Router,
    public authService: AuthService,
    public questionService: QuestionService
  ) {}
  userEmail: string;

  ngOnInit(): void {
    this.authService.getAuthState().subscribe((useremail) => {
      this.userEmail = useremail;
    });
  }

  onLogout(): void {
    this.authService.signOut().then(() => {
      this.router.navigate(['login']);
    });
  }
}
