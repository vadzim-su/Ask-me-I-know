import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { QuestionService } from '../shared/services/question.service';
declare var $: any;

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss'],
})
export class QuestionFormComponent implements OnInit {
  userEmail: string;
  newQuestion: FormGroup;
  categories: any;
  allQuestions: any;

  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    public questionService: QuestionService
  ) {
    this.newQuestion = this.fb.group({
      title: ['', [Validators.required]],
      text: ['', [Validators.required]],
      tags: fb.array(['', [Validators.required]]),
    });
  }

  ngOnInit(): void {
    this.userEmail = this.authService.userEmail;
    this.questionService
      .getCategories()
      .subscribe((data: Array<string>) => (this.categories = data));
  }

  addQuestion(): void {
    $('#exampleModal').modal('toggle');
    this.newQuestion.value.date = new Date();
    this.newQuestion.value.id = +this.newQuestion.value.date;
    this.newQuestion.value.author = this.userEmail;
    console.log(this.newQuestion.value);
    this.newQuestion.reset();
  }

  checkValues(event) {
    event.target.checked
      ? this.newQuestion.value['tags'].push(event.target.value)
      : null;
  }
}
