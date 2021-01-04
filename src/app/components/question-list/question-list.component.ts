import { Component, OnInit } from '@angular/core';
import Question from 'src/app/models/question.model';
import { QuestionService } from 'src/app/shared/services/question.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss'],
})
export class QuestionListComponent implements OnInit {
  allQuestions: Question[];
  constructor(public questionService: QuestionService) {}

  ngOnInit(): void {
    this.questionService
      .getAllQuestions()
      .then((response) => {
        this.allQuestions = response;
      })

      .catch((error) => {
        console.log('error=', error);
      });
  }
}
