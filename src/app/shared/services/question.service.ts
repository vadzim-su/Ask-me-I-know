import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DocumentData, QuerySnapshot } from '@angular/fire/firestore';
import Question from '../../models/question.model';
import firebase from 'firebase/app';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  allQuestions: Question[];

  constructor(private http: HttpClient) {}

  getAllQuestions() {
    return firebase
      .firestore()
      .collection('questions')
      .get()
      .then((response: QuerySnapshot<DocumentData>) => {
        return response.docs.map((question) => {
          const savedQuestion = question.data();
          return { ...savedQuestion, id: question.id } as Question;
        });
      });
  }

  addNewQuestion(question) {
    return firebase
      .firestore()
      .collection('questions')
      .add(question)
      .then((response) => response);
  }
}
