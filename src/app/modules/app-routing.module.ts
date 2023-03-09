import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BooktheatreComponent } from './booktheatre/booktheatre.component';
import { HomepageComponent } from './homepage/homepage.component';
import { SeatbookingComponent } from './seatbooking/seatbooking.component';


const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'theatre', component: BooktheatreComponent },
  { path: 'seating', component: SeatbookingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
