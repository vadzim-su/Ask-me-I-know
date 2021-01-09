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
  isAdmin: boolean = true;
  id: string;
  constructor(
    public questionService: QuestionService,
    public router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
  }

  moderateQuestion() {
    console.log('Moderated');
  }

  deleteQuestion() {
    console.log('Delete');
    this.questionService.delete(this.id).then(() => {
      this.router.navigate(['']);
    });
  }
}
