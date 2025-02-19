import { Component, CUSTOM_ELEMENTS_SCHEMA, Inject } from '@angular/core';
import { GenericService } from '../../services/generic.service';
import { ActivatedRoute } from '@angular/router';
import { NgStyle } from '@angular/common';
import { SafePipe } from '../../pipes/safe.pipe';


@Component({
  selector: 'app-movie-details',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [NgStyle, SafePipe],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css'
})
export class MovieDetailsComponent {
  constructor(@Inject(GenericService) private http: GenericService, private router: ActivatedRoute) { }
  movieDetails: any = {}
  movieCredits: any = []
  photo = ''
  videos: any[] = []
  paramId: any = ''

  ngOnInit() {
    this.paramId = this.router.snapshot.paramMap.get('id');
    this.getMovies()
    this.getVideos()
    this.getCredits()
  }

  getMovies() {
    return this.http.getMovieDetails(this.paramId).subscribe({
      next: response => {
        this.movieDetails = response
        this.photo = `https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${response.backdrop_path}`
      },
      error: err => console.log(err)
    })
  }
  getVideos() {
    return this.http.getVideos(this.paramId).subscribe({
      next: (res) => {
        res.results.map(result => {
          if (result.type == 'Trailer') {
            this.videos.push(`https://www.youtube.com/embed/${result.key}`)
          }
        })
      },
      error: (err) => { console.log(err) },
    });
  }


  getCredits() {
    this.http.getMovieCredits(this.paramId).subscribe({
      next: res => this.movieCredits = res,
      error: err => console.log(err)

    });
  }
}
