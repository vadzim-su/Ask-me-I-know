import { Pipe, PipeTransform } from '@angular/core';
import Question from '../interfaces/question.model';
import { AuthService } from '../services/auth.service';
import { FilterService } from '../services/filter.service';
import { tags } from '../data/tags';

@Pipe({
  name: 'filter',
  pure: false,
})
export class FilterQuestionsPipe implements PipeTransform {
  constructor(
    private filterService: FilterService,
    private authService: AuthService
  ) {}
  transform(questions: Question[], params: any): Question[] {
    const now = new Date();
    return questions?.filter(
      (question) =>
        (this.filterService.filters.questions === 'all'
          ? question
          : this.filterService.filters.questions === 'answered'
          ? question.hasSolution
          : !question.hasSolution) &&
        (this.filterService.filters.moderation === 'all'
          ? question
          : this.filterService.filters.moderation === 'approved'
          ? question.isModerated
          : !question.isModerated) &&
        (this.filterService.filters.owner === 'all'
          ? question
          : this.filterService.filters.owner === 'my questions'
          ? question.author === this.authService.userEmail
          : question.author !== this.authService.userEmail) &&
        (this.filterService.filters.periods === 'all'
          ? question
          : this.filterService.filters.periods === 'day'
          ? +now - question.date <= 1000 * 60 * 60 * 24
          : this.filterService.filters.periods === 'week'
          ? +now - question.date <= 1000 * 60 * 60 * 24 * 7
          : +now - question.date <= 1000 * 60 * 60 * 24 * 30)
      // &&
      // (!this.filterService.filters.categories.length ||
      // this.findSamesCategories(question, this.filterService.filters)
      //   ? question
      //   : null)
    );
  }

  // findAnsweredQuestions(question: Question) {
  //   this.filterService.filters.questions === 'all'
  //     ? question
  //     : this.filterService.filters.questions === 'answered'
  //     ? question.hasSolution
  //     : !question.hasSolution;
  // }

  findSamesCategories(question, filter) {
    filter.categories.forEach((cat) => {
      if (question.tags.includes(cat)) {
        console.log(true);
        return true;
      } else {
        // console.log(false);
        // return false;
      }
    });
  }
}
