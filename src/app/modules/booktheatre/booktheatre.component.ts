import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DataserviceService } from '../../services/dataservice.service';

@Component({
  selector: 'app-booktheatre',
  templateUrl: './booktheatre.component.html',
  styleUrls: ['./booktheatre.component.css']
})
export class BooktheatreComponent implements OnInit {
  theatreDetails: any;
  movies: Array<any>;
  theatres: Array<any>;
  availableMovie: object;
  todayShowList: Array<any>;
  showTime: any;
  displayStyle = 'none';
  constructor(private route: ActivatedRoute, private dataService: DataserviceService) { }

  ngOnInit() {
    this.theatreDetails = this.dataService.selectedTheatre;
    this.getData();
  }

  getData() {
    this.dataService.getData().subscribe((res) => {
      console.log(res);
      this.movies = res.movies;
      this.theatres = res.theatre;
      this.getResult();
    }, (err) => {
      console.log(err);
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
    const movieNames = Object.entries(theatre).sort().filter(([key, _]) => {
      return key.includes('movie');
    }).map(([_, movieName]) => movieName);
    this.showTime = Object.entries(theatre).sort().filter(([key, _]) => {
      return key.includes('time');
    }).map(([_, movieName]) => movieName);
    console.log(theatreHash, movieHash, movieNames, this.showTime);
    const movies = movieNames.map((showKey) => {
      return movieHash.get(showKey);
    });
    console.log(movies);
    this.todayShowList = movies.sort();
    console.log(this.todayShowList);
  }


  openPopup(e, time) {
    e.time = time;
    const data = { theatreData: this.theatreDetails, movieData: e};
    this.displayStyle = 'block';
    // this.dataService.movieDetail = e;
    this.dataService.movieDetail.next( data);
  }

  closePopup() {
    this.displayStyle = 'none';
  }
}

