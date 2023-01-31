import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomepageComponent } from './modules/homepage/homepage.component';
import { AppRoutingModule } from './modules/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BooktheatreComponent } from './modules/booktheatre/booktheatre.component';
import { NavbarComponent } from './modules/navbar/navbar.component';
import { SeatbookingComponent } from './modules/seatbooking/seatbooking.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FooterComponent } from './modules/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    BooktheatreComponent,
    NavbarComponent,
    SeatbookingComponent,
    FooterComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
  ],
  providers: [],
  bootstrap: [AppComponent],

})
export class AppModule { }
