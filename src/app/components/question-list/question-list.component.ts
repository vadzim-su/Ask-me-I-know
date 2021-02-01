import { Component, OnInit } from '@angular/core';
import Question from 'src/app/shared/interfaces/question.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FilterService } from 'src/app/shared/services/filter.service';
import { QuestionService } from 'src/app/shared/services/question.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss'],
})
export class QuestionListComponent implements OnInit {
  isLoading: boolean = true;
  allQuestions: Question[];
  constructor(
    public questionService: QuestionService,
    public filterService: FilterService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.updateQuestions();
  }

  updateQuestions(): void {
    this.isLoading = true;
    this.questionService
      .get()
      .then((questions) => {
        this.allQuestions = questions;
      })
      .then(() => {
        this.isLoading = false;
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
