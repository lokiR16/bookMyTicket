import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DataserviceService } from '../../services/dataservice.service';
import { formatDate } from '@angular/common';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';


@Component({
  selector: 'app-booktheatre',
  templateUrl: './booktheatre.component.html',
  styleUrls: ['./booktheatre.component.css']
})
export class BooktheatreComponent implements OnInit {
  currentTheatreDetails: any;
  theatreDetails: any;
  movies: Array<any>;
  theatres: Array<any>;
  availableMovie: object;
  todayShowList: Array<any>;
  showTime: any;
  showDate: any = new Date();
  displayStyle = 'none';
  todayDate: Date = new Date();
  dateArr: Array<any> = [];
  selectedIndex = 0;

  // tslint:disable-next-line:max-line-length
  constructor(private location: Location, private router: Router, private route: ActivatedRoute, private dataService: DataserviceService) { }

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      this.theatreDetails = params.params;
      this.selectedIndex = Number(params.params.dateId) || 0;
  });
    this.getDate();
    this.getData();
  }

  getData() {
    this.dataService.getData().subscribe((res) => {
      this.movies = res.movies;
      this.theatres = res.theatre;
      this.getResult();
    }, (err) => {
    });
  }
  getMoviesHash(movies) {
    return movies.reduce((currMap, currItem) => {
      currMap.set(currItem.movie_name, currItem);
      return currMap;
    }, new Map());
  }

  getTheatresHash(movies) {
    return movies.reduce((currMap, currItem) => {
      currMap.set(currItem.theatre_name, currItem);
      return currMap;
    }, new Map());
  }

  getResult() {
    const theatreHash = this.getTheatresHash(this.theatres);
    const movieHash = this.getMoviesHash(this.movies);
    const theatre = theatreHash.get(this.theatreDetails.theatre_name);
    this.currentTheatreDetails = theatre;
    const movieNames = Object.entries(theatre).sort().filter(([key, _]) => {
      return key.includes('movie');
    }).map(([_, movieName]) => movieName);
    this.showTime = Object.entries(theatre).sort().filter(([key, _]) => {
      return key.includes('time');
    }).map(([_, movieName]) => movieName);
    const movies = movieNames.map((showKey) => {
      return movieHash.get(showKey);
    });
    this.todayShowList = movies.sort();
  }


  openPopup(e, time) {
    e.time = time;
    e.date = formatDate(this.showDate, 'dd/MM/yyyy', 'en-US');
    const data = { theatreData: this.currentTheatreDetails, movieData: e};
    this.displayStyle = 'block';
    // this.dataService.movieDetail = e;
    this.dataService.movieDetail.next( data);
    this.router.navigate(['/seating']);
  }

  closePopup() {
    this.displayStyle = 'none';
  }

  openTab(e, index) {
    this.selectedIndex = index;
    console.log(e);
    this.showDate = e;
    // tslint:disable-next-line:no-string-literal
    const clone = { ...this.theatreDetails };
    clone.dateId = index;
    const url = this.router.createUrlTree([], {relativeTo: this.route, queryParams: clone}).toString();
    this.router.navigateByUrl(url);
  }

  getDate() {

// const dateToday = formatDate(this.todayDate, 'dd/MM/yyyy', 'en-US');
const dateToday = new Date();
dateToday.setDate(this.todayDate.getDate());
const dateTomorrow = new Date();
dateTomorrow.setDate(this.todayDate.getDate() + 1);
const dateAfterTomorrow = new Date();
dateAfterTomorrow.setDate(this.todayDate.getDate() + 2);
const dateAfterTomorrowone = new Date();
dateAfterTomorrowone.setDate(this.todayDate.getDate() + 3);
this.dateArr.push({label: this.todayDate, value: dateToday});
this.dateArr.push({label: dateTomorrow, value: dateTomorrow});
this.dateArr.push({label: dateAfterTomorrow, value: dateAfterTomorrow});
this.dateArr.push({label: dateAfterTomorrowone, value: dateAfterTomorrowone});
  }
}
