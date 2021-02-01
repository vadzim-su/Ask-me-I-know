import { Component, OnInit } from '@angular/core';
import { tags } from '../../shared/data/tags';
import {
  questions,
  periods,
  owners,
  moderation,
} from '../../shared/data/filters';
import { sorts } from '../../shared/data/sorts';
import { layouts, themes } from '../../shared/data/settings';
import { FilterService } from 'src/app/shared/services/filter.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-settings-bar',
  templateUrl: './settings-bar.component.html',
  styleUrls: ['./settings-bar.component.scss'],
})
export class SettingsBarComponent implements OnInit {
  tags: string[] = tags;
  filterCategories: string = '';
  questions: string[] = questions;
  periods: string[] = periods;
  owners: string[] = owners;
  moderation: string[] = moderation;
  sorts: string[] = sorts;
  themes: string[] = themes;
  layouts: string[] = layouts;

  constructor(
    public filterService: FilterService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {}

  handleRadios(e: any): void {
    this.filterService.filters[e.target.name] = e.target.value;
  }

  handleCheckboxes(e: any): void {
    const checkboxesArray = this.filterService.filters.categories;
    if (e.target.checked) {
      checkboxesArray.push(e.target.value);
    } else {
      const index = checkboxesArray.findIndex(
        (checkbox) => checkbox === e.target.value
      );
      checkboxesArray.splice(index, 1);
    }
  }

  handleSorting(e: any): void {
    this.filterService.sort = e.target.value;
  }

  changeLayout(): void {
    this.filterService.isLayoutBlock = !this.filterService.isLayoutBlock;
  }

  changeTheme() {
    this.filterService.isDarkTheme = !this.filterService.isDarkTheme;
  }
}
