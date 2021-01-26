import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

import { AuthService } from './shared/services/auth.service';
import { QuestionService } from './shared/services/question.service';

import { AngularFireModule } from '@angular/fire';

import { environment } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { QuestionFormComponent } from './components/question-form/question-form.component';
import { SingleQuestionComponent } from './components/single-question/single-question.component';
import { QuestionListComponent } from './components/question-list/question-list.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { HeaderComponent } from './components/header/header.component';
import { SettingsBarComponent } from './components/settings-bar/settings-bar.component';
import { PlusButtonComponent } from './components/plus-button/plus-button.component';
import { SeparateQuestionPageComponent } from './components/separate-question-page/separate-question-page.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FilterPipe } from './shared/pipes/filter.pipe';
import { FilterService } from './shared/services/filter.service';
import { SortPipe } from './shared/pipes/sort.pipe';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    HomepageComponent,
    QuestionFormComponent,
    SingleQuestionComponent,
    QuestionListComponent,
    SpinnerComponent,
    HeaderComponent,
    SettingsBarComponent,
    PlusButtonComponent,
    SeparateQuestionPageComponent,
    ProfileComponent,
    SortPipe,
    FilterPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    NgbModule,
    HttpClientModule,
  ],
  providers: [AuthService, QuestionService, FilterService],
  bootstrap: [AppComponent],
})
export class AppModule {}
