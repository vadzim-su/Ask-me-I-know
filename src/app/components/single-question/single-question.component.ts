import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Question from '../../shared/interfaces/question.model';
import { QuestionService } from '../../shared/services/question.service';

@Component({
  selector: 'app-single-question',
  templateUrl: './single-question.component.html',
  styleUrls: ['./single-question.component.scss'],
})
export class SingleQuestionComponent implements OnInit {
  @Input() question: Question;
  isAdmin: boolean = true;
  id: string;
  constructor(
    public questionService: QuestionService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
  }
}
