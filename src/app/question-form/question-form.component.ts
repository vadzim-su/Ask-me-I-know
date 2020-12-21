import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss'],
})
export class QuestionFormComponent implements OnInit {
  question: FormGroup;
  constructor(private fb: FormBuilder, private db: AngularFireDatabase) {}

  categories = ['Frontend', '.Net', 'Java', 'Salesforce', 'PHP'];

  ngOnInit(): void {
    this.question = this.fb.group({
      title: new FormControl('', [Validators.required]),
      text: new FormControl('', [Validators.required]),
      tag: new FormControl('', [Validators.required]),
    });
  }

  addQuestion() {
    $('#exampleModal').modal('toggle');
    console.log(this.question.value);
  }
}
