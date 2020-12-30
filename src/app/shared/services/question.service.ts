import { HttpClient } from '@angular/common/http';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

import Question from '../../models/question.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  questionCollection: AngularFirestoreCollection<Question>;
  questions: Observable<Question[]>;
  // categories: Array<string>;
  categories: any;

  constructor(private http: HttpClient, private afs: AngularFirestore) {
    this.questions = this.afs.collection('questions').valueChanges();
  }

  getCategories() {
    this.categories = this.http.get('assets/data/categories.json');
    return this.categories;
  }
  getAllQuestions() {
    return this.questions;
  }
}
