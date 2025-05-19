import { Component } from '@angular/core';
import { GenericService } from '../../services/generic.service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';

@Component({
  selector: 'app-search',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [GenericService],
  imports: [FormsModule, RouterLink, SpinnerComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  searchText: string = '';
  loading = false;

  movies: any[] = [];
  private searchSubject = new Subject<string>();

  constructor(private Http: GenericService) { }

  ngOnInit() {
    this.searchSubject.pipe(
      debounceTime(700),
      distinctUntilChanged(),
      switchMap((value) => this.Http.getMovieByTitle(value))
    ).subscribe({
      next: (data) => {
        this.movies = data.results
        this.loading = false
      },
      error: (err) => console.log(err)
    });
  }

  onInputChange(value: string) {
    this.searchSubject.next(value);
    if (value !== '') {
      this.loading = true
    } else {
      this.loading = false
    }
  }

}
