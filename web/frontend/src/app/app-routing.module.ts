import { NgModule } from '@angular/core';
import { AuthGuard } from './auth/auth.guard';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { ProjectComponent } from './project/project.component';
import { ProjectViewComponent } from './project-view/project-view.component';
import { RegistrationComponent } from './registration/registration.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ChatListComponent } from './chat-list/chat-list.component';
import { ChatViewComponent } from './chat-view/chat-view.component';
import { ChatNewComponent } from './chat-new/chat-new.component';
import {PasswordResetComponent } from './password-reset/password-reset.component';
import { PasswordConfirmComponent } from './password-confirm/password-confirm.component';
import { PasswordSetNewComponent } from './password-set-new/password-set-new.component';
import { PasswordResetDoneComponent } from './password-reset-done/password-reset-done.component';

const routes: Routes = [
  { path:  '', redirectTo:  'profile', pathMatch:  'full' },
  { path:  'login', component:  LoginComponent },
  { path:  'password-reset', component:  PasswordResetComponent },
  { path:  'registration', component:  RegistrationComponent },
  { path:  'password-confirm', component: PasswordConfirmComponent},
  { path:  'password-set-new', component: PasswordSetNewComponent},
  { path:  'password-reset-done', component: PasswordResetDoneComponent},

  { path:  '',
    canActivateChild: [AuthGuard],
    children: [ // Add your routes here. It's a protected part of the app accessable only for logged in userts
      { path:  'profile', component: ProfileComponent },
      { path:  'chats/:id', component:  ChatViewComponent },
      { path:  'projects', component:  ProjectListComponent },
      { path:  'projects/:project_id/chats/new/:type', component:  ChatNewComponent },
      { path:  'projects/new', component:  ProjectComponent },
      { path:  'projects/:id', component:  ProjectViewComponent },
  ]
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
