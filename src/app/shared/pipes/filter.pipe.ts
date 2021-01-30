import { Pipe, PipeTransform } from '@angular/core';
import Question from '../interfaces/question.model';
import Filter from '../interfaces/filter.model';
import { moderation, owners, periods, questions } from '../data/filters';

@Pipe({
  name: 'filter',
  pure: false,
})
export class FilterPipe implements PipeTransform {
  constructor() {}
  transform(
    askedQuestions: Question[],
    filters: Filter,
    email: string
  ): Question[] {
    return askedQuestions?.filter(
      (question) =>
        this.findAnsweredQuestions(question, filters) &&
        this.findModeratedQuestions(question, filters) &&
        this.findOwnerQuestions(question, filters, email) &&
        this.findPeriodsQuestions(question, filters) &&
        (!filters.categories.length ||
          this.findSamesCategories(question, filters))
    );
  }

  findAnsweredQuestions(question: Question, filter: Filter) {
    const [answeredQuestions, , allAskedQuestions] = questions;
    let output =
      filter.questions === allAskedQuestions
        ? question
        : filter.questions === answeredQuestions
        ? question.hasSolution
        : !question.hasSolution;
    return output;
  }

  findModeratedQuestions(question: Question, filter: Filter) {
    const [, approvedQuestions, allAskedQuestions] = moderation;
    let output =
      filter.moderation === allAskedQuestions
        ? question
        : filter.moderation === approvedQuestions
        ? question.isModerated
        : !question.isModerated;
    return output;
  }

  findOwnerQuestions(question: Question, filter: Filter, email: string) {
    const [myQuestions, , allAskedQuestions] = owners;
    let output =
      filter.owner === allAskedQuestions
        ? question
        : filter.owner === myQuestions
        ? question.author === email
        : question.author !== email;
    return output;
  }

  findPeriodsQuestions(question: Question, filter: Filter) {
    const now = new Date();
    const [day, lastWeek, , allAskedQuestions] = periods;
    const dayMilliSeconds = 1000 * 60 * 60 * 24;
    const weekMilliSeconds = 1000 * 60 * 60 * 24 * 7;
    const monthMilliSeconds = 1000 * 60 * 60 * 24 * 30;
    let output =
      filter.periods === allAskedQuestions
        ? question
        : filter.periods === day
        ? +now - question.date <= dayMilliSeconds
        : filter.periods === lastWeek
        ? +now - question.date <= weekMilliSeconds
        : +now - question.date <= monthMilliSeconds;
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
