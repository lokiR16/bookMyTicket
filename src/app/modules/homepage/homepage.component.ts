import { Component, OnInit } from '@angular/core';
import { DataserviceService } from '../../services/dataservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  movieList: any;
  theatreList: any;
  constructor(private dataService: DataserviceService, private router: Router) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.dataService.getData().subscribe( (res) => {
    this.movieList = res.movies;
    this.theatreList = res.theatre;
    }, (err) => {
    });
  }

  onBook(e) {
  this.dataService.selectedTheatre = e;
  this.router.navigate(['theatre'], { queryParams: e});
  }
}
