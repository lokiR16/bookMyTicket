import { Component, OnInit } from '@angular/core';
import { DataserviceService } from '../../services/dataservice.service';

@Component({
  selector: 'app-seatbooking',
  templateUrl: './seatbooking.component.html',
  styleUrls: ['./seatbooking.component.css']
})
export class SeatbookingComponent implements OnInit {
  // tslint:disable-next-line:no-inferrable-types
  rows: Array<number> = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90];
  // tslint:disable-next-line:no-inferrable-types
  seats: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  bookedSeat = [2, 4, 6, 8, 99];
  selected = [];
  showData: any;
  constructor(private dataService: DataserviceService) { }


  ngOnInit() {
    // tslint:disable-next-line:no-unused-expression
    this.dataService.movieDetail$.subscribe(data => {
      this.showData = data;
    });
  }

  updateSelection(seatNumber: number) {
    const ind = this.selected.indexOf(seatNumber);
    if (ind >= 0) {
      this.selected.splice(ind, 1);
    } else {
      this.selected.push(seatNumber);
    }
  }


  isBookedSeat(seatNumber) {
    return this.bookedSeat.includes(seatNumber);
  }
  isSelectedSeat(seatNumber) {
    return this.selected.includes(seatNumber);
  }

  bookTicket() {
    const data = {
      show_time: this.showData.movieData.time,
      movie_name: this.showData.movieData.movie_name,
      theatre_name: this.showData.theatreData.theatre_name,
      booked_seats: this.selected,
      date: '31/01/2023',
      user_mail_id: 'logeshrangababu@gmail.com'
    };
    console.log(data);
    this.dataService.bookTicket(data).subscribe(res => {
      console.log(res);
    },
      err => {
        console.log(err);
      }
    );
  }
}
