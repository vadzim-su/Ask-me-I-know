import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Question from 'src/app/models/question.model';
import { QuestionService } from 'src/app/shared/services/question.service';

@Component({
  selector: 'app-separate-question-page',
  templateUrl: './separate-question-page.component.html',
  styleUrls: ['./separate-question-page.component.scss'],
})
export class SeparateQuestionPageComponent implements OnInit {
  allQuestions: Question[];
  id: string;
  isLoading: boolean = true;
  singleQuestion: Question;
  constructor(
    public questionService: QuestionService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((params) => {
      this.id = params.id;
    });
  }

  ngOnInit(): void {
    this.questionService
      .getAllQuestions()
      .then((response) => {
        this.allQuestions = response;
      })
      // .then(() => {
      //   this.isLoading = false;
      // })
      .then(() => {
        this.singleQuestion = this.allQuestions.find((question) => {
          question.id === this.id;
        });
      })
      .catch((error) => {
        console.log('error=', error);
      });
  }
}
