import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { GenericService } from '../../services/generic.service';
import { register } from 'swiper/element/bundle';
import { RouterLink } from '@angular/router';


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

  searchText: string = ''
  bannerMovies: any[] = []
  movies: any[] = []
  Trending: any[] = []

  pageNum: number = 1;
  currentPage: number = 1;
  pageArray: number[] = [];



  constructor(private Http: GenericService) { }

  ngOnInit() {
    this.fetchMovies()
    this.fetchTrending()
    this.fetchBannerUpcoming()
    console.log('initialized')
  };






  fetchMovies() {
    this.Http.getMovies(this.currentPage.toString()).subscribe({
      next: (data) => {
        this.movies = data.results;
        this.pageNum = data.total_pages;

        this.pageArray = Array.from({ length: 10 }, (_, i) => i + 1);

      }

      , error: (err) => {
        console.log(err)
      }
    })
  }

  fetchTrending() {
    this.Http.getTrending().subscribe({
      next: (data) => {
        this.Trending = data.results;
      }
    })
  }


  fetchBannerUpcoming() {
    this.Http.getBannerUpcoming().subscribe({
      next: (data) => {
        this.bannerMovies = data.results;
      },
      error: err => console.log(err),
    })

  }


  changePage(page: number) {
    this.currentPage = page;
    this.fetchMovies();
    scrollTo(0, 0);
  }


}


// create methods and invoke them inside ngOnInit ####