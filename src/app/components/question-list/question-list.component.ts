import { Component, OnInit } from '@angular/core';
import Question from 'src/app/shared/interfaces/question.model';
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
  layout: boolean = this.filterService.isLayoutBlock;
  constructor(
    public questionService: QuestionService,
    public filterService: FilterService
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
