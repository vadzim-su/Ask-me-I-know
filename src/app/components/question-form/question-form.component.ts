import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import Question from '../../models/question.model';
import { AuthService } from '../../shared/services/auth.service';
import { QuestionService } from '../../shared/services/question.service';
import { tags } from '../../../assets/data/tags';
declare var $: any;

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss'],
})
export class QuestionFormComponent implements OnInit {
  userEmail: string;
  newQuestionForm: FormGroup;
  tags: string[] = tags;
  allQuestions: Question[];
  newQuestionInfo: Question;

  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    public questionService: QuestionService
  ) {
    this.newQuestionForm = this.fb.group({
      title: ['', [Validators.required]],
      text: ['', [Validators.required]],
      tags: fb.array([]),
    });
  }

  ngOnInit(): void {
    this.userEmail = this.authService.userEmail;
  }

  addNewQuestion(): void {
    const newQuestionInfo: Question = {
      ...this.newQuestionForm.value,
      date: +new Date(),
      author: this.authService.userEmail,
      isModerated: false,
      isResolved: false,
      comments: [],
    };

    this.questionService.addNewQuestion(newQuestionInfo);

    $('#exampleModal').modal('toggle');
    this.newQuestionForm.reset();
  }

  checkValues(event) {
    let tagsArray = this.newQuestionForm.value['tags'];
    if (event.target.checked) {
      tagsArray.push(event.target.value);
    } else {
      const index = tagsArray.findIndex(
        (checkbox) => checkbox.value === event.target.value
      );
      tagsArray.splice(index, 1);
    }
  }
}
