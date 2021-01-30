import { Injectable } from '@angular/core';
import Filter from '../interfaces/filter.model';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  filters: Filter = {
    questions: 'all',
    categories: [],
    periods: 'all',
    owner: 'all',
    moderation: 'all',
  };

  sort: string = 'new';

  isDarkTheme: boolean = false;

  isLayoutBlock: boolean = true;

  constructor() {}
}
