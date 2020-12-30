import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

import { AuthService } from './shared/services/auth.service';
import { QuestionService } from './shared/services/question.service';

import { AngularFireModule } from '@angular/fire';
// import  AngularFirestore,
//   AngularFirestoreDocument,
//   AngularFirestoreCollection,
// '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { QuestionFormComponent } from './question-form/question-form.component';
import { SingleQuestionComponent } from './single-question/single-question.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    HomepageComponent,
    QuestionFormComponent,
    SingleQuestionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    NgbModule,
    HttpClientModule,
    // AngularFirestore,
    // AngularFirestoreDocument,
    // AngularFirestoreCollection,
  ],
  providers: [AuthService, QuestionService],
  bootstrap: [AppComponent],
})
export class AppModule {}
