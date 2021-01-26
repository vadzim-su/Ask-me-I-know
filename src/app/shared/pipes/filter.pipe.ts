import { Pipe, PipeTransform } from '@angular/core';
import Question from '../interfaces/question.model';
import { AuthService } from '../services/auth.service';
import { FilterService } from '../services/filter.service';
import { tags } from '../data/tags';
import Filter from '../interfaces/filter.model';

@Pipe({
  name: 'filter',
  pure: false,
})
export class FilterPipe implements PipeTransform {
  constructor(
    private filterService: FilterService,
    private authService: AuthService
  ) {}
  transform(questions: Question[]): Question[] {
    return questions?.filter(
      (question) =>
        this.findAnsweredQuestions(question, this.filterService.filters) &&
        this.findModeratedQuestions(question, this.filterService.filters) &&
        this.findOwnerQuestions(question, this.filterService.filters) &&
        this.findPeriodsQuestions(question, this.filterService.filters) &&
        (!this.filterService.filters.categories.length ||
          this.findSamesCategories(question, this.filterService.filters))
    );
  }

  findAnsweredQuestions(question: Question, filter: Filter) {
    let output =
      filter.questions === 'all'
        ? question
        : filter.questions === 'answered'
        ? question.hasSolution
        : !question.hasSolution;
    return output;
  }

  findModeratedQuestions(question: Question, filter: Filter) {
    let output =
      filter.moderation === 'all'
        ? question
        : filter.moderation === 'approved'
        ? question.isModerated
        : !question.isModerated;
    return output;
  }

  findOwnerQuestions(question: Question, filter: Filter) {
    let output =
      filter.owner === 'all'
        ? question
        : filter.owner === 'my questions'
        ? question.author === this.authService.userEmail
        : question.author !== this.authService.userEmail;
    return output;
  }

  findPeriodsQuestions(question: Question, filter: Filter) {
    const now = new Date();
    let output =
      filter.periods === 'all'
        ? question
        : filter.periods === 'day'
        ? +now - question.date <= 1000 * 60 * 60 * 24
        : filter.periods === 'last week'
        ? +now - question.date <= 1000 * 60 * 60 * 24 * 7
        : +now - question.date <= 1000 * 60 * 60 * 24 * 30;
    return output;
  }

  findSamesCategories(question: Question, filter: Filter) {
    let isOutput = false;
    filter.categories.forEach((cat) => {
      if (question.tags.includes(cat)) {
        isOutput = true;
      }
    });
    return isOutput ? question : null;
  }
}
