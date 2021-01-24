export default class Filter {
  questions: string;
  categories: string[];
  periods: string;
  owner: string;
  moderation: string;

  constructor(filter) {
    this.questions = filter.questions;
    this.categories = filter.categories;
    this.periods = filter.periods;
    this.owner = filter.owner;
    this.moderation = filter.moderation;
  }
}
