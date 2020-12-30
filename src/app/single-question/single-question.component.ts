import { Component, OnInit } from '@angular/core';
import Question from '../models/question.model';
import { QuestionService } from '../shared/services/question.service';

@Component({
  selector: 'app-single-question',
  templateUrl: './single-question.component.html',
  styleUrls: ['./single-question.component.scss'],
})
export class SingleQuestionComponent implements OnInit {
  allQuestions = Question[];
  constructor(public questionService: QuestionService) {}

  ngOnInit(): void {
    this.questionService.getAllQuestions().subscribe((questions) => {
      this.allQuestions = questions;
    });
  }
}
