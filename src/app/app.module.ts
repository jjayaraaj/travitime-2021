import { NewTourComponent } from './operator/dashboard/tour/new-tour/new-tour.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import  { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './travel-operators/auth/auth.component';
import { RegisterComponent } from './travel-operators/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './operator/dashboard/dashboard.component';
import { HeaderComponent } from './common/header/header.component';
import { AuthInterceptor } from './service/auth-interceptor';
import { TourComponent } from './operator/dashboard/tour/tour.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { EditTourComponent } from './operator/dashboard/tour/edit-tour/edit-tour.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthComponent,
    RegisterComponent,
    DashboardComponent,
    HeaderComponent,
    TourComponent,
    PageNotFoundComponent,
   NewTourComponent,
   EditTourComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
