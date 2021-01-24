import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DocumentData, QuerySnapshot } from '@angular/fire/firestore';
import Question from '../interfaces/question.model';
import firebase from 'firebase/app';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  constructor() {}

  get(): Promise<Question[]> {
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

  create(question: Question) {
    return firebase
      .firestore()
      .collection('questions')
      .add(question)
      .then((question) => question);
  }

  getSeparateQuestionByID(id: string) {
    return firebase
      .firestore()
      .collection('questions')
      .doc(id)
      .get()
      .then((response) => {
        return response.data();
      });
  }

  delete(id: string) {
    return firebase
      .firestore()
      .collection('questions')
      .doc(id)
      .delete()
      .then((response) => {
        return response;
      });
  }

  update(id, question): any {
    return firebase
      .firestore()
      .collection('questions')
      .doc(id)
      .update(question);
  }
}
