import { Component } from '@angular/core';
import { GenericService } from '../../services/generic.service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-search',
  providers: [GenericService],
  imports: [FormsModule, RouterLink],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  constructor(private Http: GenericService) { }
  searchText: string = '';
  movies: any[] = [];
  ngOnInit() {

  }

  onInputChange(value: string) {
    this.fetchSearchedMovie(value)
  }

  fetchSearchedMovie(searchText: string) {
    return this.Http.getMovieByTitle(searchText).subscribe({
      next: (data) => {

        this.movies = data.results



      },
      error: (err) => console.log(err)
    })
  }


}
