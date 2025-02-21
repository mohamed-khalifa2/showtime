import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { GenericService } from '../../services/generic.service';
import { register } from 'swiper/element/bundle';
import { RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';


register();


@Component({
  selector: 'app-home',
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  private Http = inject(GenericService);

  movies: any[] = []
  bannerMovies: any[] = []
  Trending: any[] = []


  searchText: string = ''



  pageNum: number = 1;
  currentPage: number = 1;
  pageArray: number[] = [];



  ngOnInit() {

    forkJoin({
      movies: this.Http.getMovies(this.currentPage.toString()),
      banner: this.Http.getBannerUpcoming(),
      trending: this.Http.getTrending()
    }).subscribe({
      next: ({ movies, banner, trending }) => {

        this.movies = movies.results;
        this.pageNum = movies.total_pages;
        this.pageArray = Array.from({ length: 10 }, (_, i) => i + 1);
        this.bannerMovies = banner.results;
        this.Trending = trending.results;
      },
      error: (err) => console.log(err)
    })

  };



  fetchMovies() {
    this.Http.getMovies(this.currentPage.toString()).subscribe({
      next: (data) => {
        this.movies = data.results;
        this.pageNum = data.total_pages;
        this.pageArray = Array.from({ length: 10 }, (_, i) => i + 1);
      },
      error: (err) => {
        console.log(err)
      }
    })
  }



  changePage(page: number) {
    this.currentPage = page;
    this.fetchMovies();
    scrollTo(0, 0);
  }


}


// create methods and invoke them inside ngOnInit ####