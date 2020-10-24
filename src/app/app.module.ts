import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { ChatComponent } from './pages/chat/chat.component';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import {MatButtonModule} from '@angular/material/button';
import { DialogNewchatComponent } from './pages/chat/components/dialog-newchat/dialog-newchat.component';
import { FileShareComponent } from './pages/file-share/file-share.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TrustUrlPipe } from './services/trust-url.pipe';
import { UrlFormatterPipe } from './services/url-formatter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ChatComponent,
    DialogNewchatComponent,
    FileShareComponent,
    TrustUrlPipe,
    UrlFormatterPipe
  ],
  entryComponents: [DialogNewchatComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
