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
  providers: [AuthService, QuestionService],
  bootstrap: [AppComponent],
})
export class AppModule {}
