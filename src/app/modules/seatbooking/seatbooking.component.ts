import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { DataserviceService } from '../../services/dataservice.service';
import { Router } from '@angular/router';

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
  bookedSeat = [];
  selected = [];
  showData: any;
  todayDate: Date = new Date();
  constructor(private dataService: DataserviceService, private route: Router) { }


  ngOnInit() {
    // tslint:disable-next-line:no-unused-expression
    this.dataService.movieDetail$.subscribe(data => {
      this.showData = data;
      if (this.showData != null) {
        this.selected = [];
        this.bookedSeat = [];
        Object.keys(this.showData.theatreData).forEach(key => {
          if (this.showData.theatreData[key] === this.showData.movieData.time) {
            this.showData.theatreData.booked_seats.forEach(item => {
              if (item[key] === this.showData.movieData.time && item.date === this.showData.movieData.date) {
                this.bookedSeat = this.validator(item[key.split('_')[0] + '_booked_seats']);
              }
            });
          }
        });
      }
    });
  }

  validator(arr) {
    const c = [];
    arr.split(',').forEach(i => {
      const st = parseInt(i.replace('[', '').replace(']', ''), 10);
      if (!isNaN(st)) {
        c.push(st);
      }
    });
    return c;
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
    return this.bookedSeat.indexOf(seatNumber) > -1;
  }
  isSelectedSeat(seatNumber) {
    return this.selected.includes(seatNumber);
  }

  bookTicket() {
    const selectedSeat = JSON.stringify(this.selected);
    const dateTo = formatDate(this.todayDate, 'dd/MM/yyyy', 'en-US');
    const data = {
      show_time: this.showData.movieData.time,
      movie_name: this.showData.movieData.movie_name,
      theatre_name: this.showData.theatreData.theatre_name,
      booked_seats: selectedSeat,
      date: this.showData.movieData.date,
      user_mail_id: 'logeshrangababu@gmail.com'
    };
    console.log(data);
    this.dataService.bookTicket(data).subscribe(res => {
      this.route.navigate(['/']);
      alert(res.message);
    },
      err => {
        alert (err);
      }
    );
  }
}
