import { Pipe, PipeTransform } from '@angular/core';
import { sorts } from '../data/sorts';
import Question from '../interfaces/question.model';

@Pipe({
  name: 'sort',
  pure: false,
})
export class SortPipe implements PipeTransform {
  constructor() {}
  transform(questions: Question[], sort: string): Question[] {
    const [, newQuestions] = sorts;
    if (sort === newQuestions) {
      return questions?.sort((a, b) => b.date - a.date);
    } else {
      return questions?.sort((a, b) => a.date - b.date);
    }
  }
}
