import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { MovieInterface } from '../interfaces/Movies.interface';
import { ResultView } from '../interfaces/resultView';
import { RootObject } from '../interfaces/Videos.insterface';
import { MovieDetailsView } from '../interfaces/movieDetails.interface';

@Injectable({
  providedIn: 'root'
})
export class GenericService {

  constructor(private httpClient: HttpClient) { }

  getMovies(page: string): Observable<ResultView<MovieInterface[]>> {
    return this.httpClient.get<ResultView<MovieInterface[]>>(`${environment.baseUrl}/discover/movie?page=${page}`);
  }

  getTrending(): Observable<any> {
    return this.httpClient.get<any>(`${environment.baseUrl}/trending/movie/day`);
  }

  getBannerUpcoming(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/movie/upcoming`);
  }


  // movie details page

  getMovieDetails(id: any): Observable<MovieDetailsView> {
    return this.httpClient.get<MovieDetailsView>(`${environment.baseUrl}/movie/${id}`)
  }
  getVideos(id: unknown): Observable<RootObject> {
    return this.httpClient.get<RootObject>(`${environment.baseUrl}/movie/${id}/videos`)
  }

  getMovieCredits(id: any) {
    return this.httpClient.get(`${environment.baseUrl}/movie/${id}/credits`)
  }


  getMovieByTitle(title: string): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/search/movie?query=${title}`)
  }

}

