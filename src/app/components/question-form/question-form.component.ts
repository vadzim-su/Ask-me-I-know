import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Question from '../../shared/interfaces/question.model';
import { AuthService } from '../../shared/services/auth.service';
import { QuestionService } from '../../shared/services/question.service';
import { tags } from '../../shared/data/tags';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss'],
})
export class QuestionFormComponent implements OnInit {
  @Input() singleQuestion: Question;
  @Output() updateData = new EventEmitter();

  userEmail: string;
  newQuestionForm: FormGroup;
  tags: string[] = tags;
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    public questionService: QuestionService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.userEmail = this.authService.userEmail;
    this.newQuestionForm = this.fb.group({
      title: [
        this.singleQuestion ? this.singleQuestion?.title : '',
        [Validators.required],
      ],
      text: [this.singleQuestion?.text || '', [Validators.required]],
      tags: this.fb.array([]),
    });
  }

  addNewQuestion(): void {
    this.isLoading = true;
    const newQuestionInfo: Question = {
      ...this.newQuestionForm.value,
      date: +new Date(),
      author: this.authService.userEmail,
      isModerated: false,
      comments: [],
      hasSolution: false,
    };

    this.questionService
      .create(newQuestionInfo)
      .then(() => (this.isLoading = false))
      .then(() => {
        this.resetForm();
        $('#exampleModal').modal('toggle');
        this.updateData.emit('');
      })
      .then(() => {
        this.router.navigate(['']);
      });
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

  resetForm() {
    this.newQuestionForm.reset();
    let checkboxes = document.querySelectorAll(
      'input[type="checkbox"]:checked'
    );
    checkboxes.forEach((checkbox: HTMLInputElement) => {
      checkbox.checked = false;
    });
  }
}
