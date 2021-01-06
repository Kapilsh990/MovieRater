import { Component, Input, OnInit ,Output,EventEmitter} from '@angular/core';
import { Movie } from 'src/app/models/Movie';
import{ ApiService} from '../../api.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {

  @Input() movie: Movie;
  @Output() updateMovie = new EventEmitter<Movie>();
  rateHovered=0;

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
  }
  rateHover(rate: number) {
    this.rateHovered = rate;
  }
  rateClicked(rate: number) {
    this.apiService.rateMovie(rate,this.movie.id).subscribe(
      result => this.getDetails(),
      error => console.error()
      
    )
  }

  getDetails() {
    this.apiService.getMovie(this.movie.id).subscribe(
      (movie: Movie) => {
        this.updateMovie.emit(movie);
      },
      error => console.error()
      
    )
  }

}
