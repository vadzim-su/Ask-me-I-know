import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import Question from '../../shared/interfaces/question.model';
import { AuthService } from '../../shared/services/auth.service';
import { QuestionService } from '../../shared/services/question.service';
import { tags } from '../../shared/data/tags';
import { ActivatedRoute, Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss'],
})
export class QuestionFormComponent implements OnInit {
  @Input() singleQuestion: Question;
  @Input() allQuestions: Question[];
  @Output() updateData = new EventEmitter();

  userEmail: string;
  newQuestionForm: FormGroup;
  tags: string[] = tags;
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    public questionService: QuestionService,
    public router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.userEmail = this.authService.userEmail;
    this.newQuestionForm = this.fb.group({
      title: [this.singleQuestion?.title, [Validators.required]],
      text: [this.singleQuestion?.text, [Validators.required]],
      tags: this.fb.array(
        // this.singleQuestion.tags.map((tag) => this.checkedCategories(tag)),
        [],
        Validators.required
      ),
    });
    // console.log(this.newQuestionForm.controls.tags.value);
    // console.log(this.singleQuestion);
    // const tags = this.newQuestionForm.controls.tags as FormArray;
    // console.log(tags);
    // this.contacts.map(contact => this.createContact(contact))
    // this.singleQuestion?.tags.value.map((tag) => tags.push(new FormControl(tag)));
    // tags.value.map((tag) => tags.push(new FormControl(tag)));
    // console.log(maincolor);
  }

  checkedCategories(tag): FormArray {
    return this.fb.array([tag]);
  }

  addNewQuestion(): void {
    this.isLoading = true;
    if (!this.singleQuestion) {
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
        .then(() => this.closeQuestionForm());
    } else {
      const id = this.route.snapshot.params.id;
      this.questionService
        .update(id, this.newQuestionForm.value)
        .then(() => this.closeQuestionForm());
    }
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

  closeQuestionForm(): void {
    (this.isLoading = false), this.resetForm();
    $('#exampleModal').modal('toggle');
    this.updateData.emit('');

    this.router.navigate(['']);
  }
}
