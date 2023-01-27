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
  constructor(private route: ActivatedRoute, private dataService: DataserviceService ) { }

  ngOnInit() {
    this.theatreDetails = this.dataService.selectedTheatre;
    this.getData();
  }

  getData() {
    this.dataService.getData().subscribe( (res) => {
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
    const movieNames = Object.entries(theatre).filter(([key, _]) => {
      return key.includes('movie');
    }).map(([ _, movieName ]) => movieName);
    const movies = movieNames.map((showKey) => {
        return movieHash.get(showKey);
      });
    this.todayShowList = movies;
    console.log(movies);
    }
}

