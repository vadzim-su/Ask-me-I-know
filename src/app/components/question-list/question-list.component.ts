import { Component, OnInit } from '@angular/core';
import Question from 'src/app/shared/interfaces/question.model';
import { QuestionService } from 'src/app/shared/services/question.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss'],
})
export class QuestionListComponent implements OnInit {
  isLoading: boolean = true;
  allQuestions: Question[];
  constructor(public questionService: QuestionService) {}

  ngOnInit(): void {
    this.updateQuestions();
  }

  updateQuestions() {
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
