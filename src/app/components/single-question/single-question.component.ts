import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Question from '../../models/question.model';
import { QuestionService } from '../../shared/services/question.service';

@Component({
  selector: 'app-single-question',
  templateUrl: './single-question.component.html',
  styleUrls: ['./single-question.component.scss'],
})
export class SingleQuestionComponent implements OnInit {
  @Input() question: Question;
  // id: string;
  constructor(
    public questionService: QuestionService,
    public router: Router,
    private route: ActivatedRoute
  ) {
    // this.route.params.subscribe((params) => {
    //   this.id = params.id;
    //   console.log(this.id);
    // });
  }

  ngOnInit(): void {}
}
