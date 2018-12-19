import { AlertifyService } from './services/Alertify.service';
import { AuthService } from './services/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from "@angular/forms";

import { HomeComponent } from "./components/home/home.component";
import { RegisterComponent } from "./components/register/register.component";
import { AppComponent } from './components/app/app.component';
import { NavComponent } from './components/nav/nav.component';
import { ErrorInterceptorProvider } from './services/error.interceptor';

@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule
   ],
   providers: [ErrorInterceptorProvider, AuthService, AlertifyService],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
