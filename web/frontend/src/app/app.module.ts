import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CustomMaterialModule } from './core/material.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from './core/user.service';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ProfileComponent } from './profile/profile.component';
import { ProjectComponent } from './project/project.component';
import { ProjectViewComponent, DialogOverviewMessage } from './project-view/project-view.component';
import { CookieService } from 'ngx-cookie-service';
import { RegistrationComponent } from './registration/registration.component';

import { ProjectService } from './core/project.service';
import { ProjectListComponent } from './project-list/project-list.component';
import { ChatListComponent } from './chat-list/chat-list.component';
import { ChatViewComponent, DialogOverviewChat } from './chat-view/chat-view.component';
import { ChatService } from './core/chat.service';
import { ChatNewComponent } from './chat-new/chat-new.component';

import { MatDialogModule, MatButtonModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { FileUploadModule } from 'ng2-file-upload';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { PasswordConfirmComponent } from './password-confirm/password-confirm.component';
import { PasswordSetNewComponent } from './password-set-new/password-set-new.component';
import { PasswordResetDoneComponent } from './password-reset-done/password-reset-done.component';
import { PasswordResetService} from './core/password-reset.service';
import { MemberlistComponent, InviteDialog } from './memberlist/memberlist.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    ProjectComponent,
    ProjectViewComponent,
    RegistrationComponent,
    ProjectListComponent,
    ChatListComponent,
    ChatViewComponent,
    DialogOverviewMessage,
    DialogOverviewChat,
    ChatNewComponent,
    MemberlistComponent,
    PasswordResetComponent,
    PasswordConfirmComponent,
    PasswordSetNewComponent,
    PasswordResetDoneComponent,
    InviteDialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CustomMaterialModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatDialogModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FileUploadModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    ReactiveFormsModule,
    NgxMaterialTimepickerModule.forRoot()
  ],
  providers: [
    UserService,
    ProjectService,
    CookieService,
    ChatService,
    PasswordResetService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    DialogOverviewMessage,
    DialogOverviewChat,
    InviteDialog
  ]
})
export class AppModule { }
