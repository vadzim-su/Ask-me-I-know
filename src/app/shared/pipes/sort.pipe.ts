import { Pipe, PipeTransform } from '@angular/core';
import { questions } from '../data/filters';
import Question from '../interfaces/question.model';
import { FilterService } from '../services/filter.service';

@Pipe({
  name: 'sort',
  pure: false,
})
export class SortPipe implements PipeTransform {
  constructor(private filterService: FilterService) {}
  transform(questions: Question[], ...args: unknown[]): Question[] {
    if (this.filterService.sort === 'new') {
      return questions?.sort((a, b) => b.date - a.date);
    } else {
      return questions?.sort((a, b) => a.date - b.date);
    }
  }
}
