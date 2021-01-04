import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import {
  AngularFireAuthGuard,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';
import { SingleQuestionComponent } from './components/single-question/single-question.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectAuthorizedToLogin = () => redirectLoggedInTo(['']);

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectAuthorizedToLogin },
  },
  {
    path: 'registration',
    component: RegistrationComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectAuthorizedToLogin },
  },
  {
    path: '',
    component: HomepageComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: 'question/:id',
    component: SingleQuestionComponent,
  },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
