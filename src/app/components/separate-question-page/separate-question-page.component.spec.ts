import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeparateQuestionPageComponent } from './separate-question-page.component';

describe('SeparateQuestionPageComponent', () => {
  let component: SeparateQuestionPageComponent;
  let fixture: ComponentFixture<SeparateQuestionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeparateQuestionPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeparateQuestionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
