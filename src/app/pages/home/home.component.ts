import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, ViewChild, ElementRef } from '@angular/core';
import { GenericService } from '../../services/generic.service';
import { register } from 'swiper/element/bundle';
import { RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';


register();

@Component({
  selector: 'app-home',
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [RouterLink, SpinnerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  private Http = inject(GenericService);
  movies: any[] = []
  bannerMovies: any[] = []
  Trending: any[] = []
  searchText: string = ''

  loading = false


  pageNum: number = 1;  //total number of pages
  currentPage: any = 1; //current page

  @ViewChild('movieBrowse') movieBrowse!: ElementRef; // to scroll to this section

  ngOnInit() {
    this.loading = true
    forkJoin({
      movies: this.Http.getMovies(this.currentPage.toString()),
      banner: this.Http.getBannerUpcoming(),
      trending: this.Http.getTrending()
    }).subscribe({
      next: ({ movies, banner, trending }) => {

        this.movies = movies.results;
        this.pageNum = movies.total_pages;
        this.bannerMovies = banner.results;
        this.Trending = trending.results;
        this.loading = false
      },
      error: (err) => console.log(err)
    })

  };



  fetchMovies() {
    this.Http.getMovies(this.currentPage.toString()).subscribe({
      next: (data) => {
        this.movies = data.results;
        this.pageNum = data.total_pages;
        this.loading = false

      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  get paginationArray(): (number | string)[] {
    const range = [];
    const delta = 2;

    for (let i = 1; i <= this.pageNum; i++) {
      if (i === 1 || i === this.pageNum || (i >= this.currentPage - delta && i <= this.currentPage + delta)) {
        range.push(i);
      } else if (range[range.length - 1] !== "...") {
        range.push("...");
      }
    }
    return range;
  }



  changePage(page: number | string) {
    if (page !== "..." && page !== this.currentPage) {
      this.currentPage = page;
    }
    this.movieBrowse.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    this.loading = true
    this.fetchMovies();

  }


}


