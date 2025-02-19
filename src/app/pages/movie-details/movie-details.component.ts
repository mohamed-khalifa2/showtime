import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { GenericService } from '../../services/generic.service';
import { ActivatedRoute } from '@angular/router';
import { NgStyle } from '@angular/common';
import { SafePipe } from '../../pipes/safe.pipe';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-movie-details',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [NgStyle, SafePipe],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css'
})
export class MovieDetailsComponent {
  private http = inject(GenericService);
  private router = inject(ActivatedRoute);
  movieDetails: any = {}
  movieCredits: any = []
  photo = ''
  videos: any[] = []
  paramId: any = ''

  ngOnInit() {
    this.paramId = this.router.snapshot.paramMap.get('id');
    if (!this.paramId) return;
    forkJoin({
      details: this.http.getMovieDetails(this.paramId),
      videos: this.http.getVideos(this.paramId),
      credits: this.http.getMovieCredits(this.paramId)
    }).subscribe({
      next: ({ details, videos, credits }) => {
        this.movieDetails = details;
        this.photo = `https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${details.backdrop_path}`;
        this.videos = videos.results.map((video) => `https://www.youtube.com/embed/${video.key}`);
        this.movieCredits = credits;
      },
      error: (err) => console.error('Error fetching movie data:', err),
    });
  }
}

