import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { People } from '../model';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { catchError, EMPTY } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.sass'],
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
})
export class PeopleComponent implements OnInit {
  data: People = {} as People;
  currentPage = 1;
  hasError = false;

  constructor(public dataService: DataService, private router: Router) {}

  ngOnInit() {
    this.loadPeople();
  }

  loadPeople() {
    this.dataService
      .loadPeople()
      .pipe(
        catchError(err => {
          console.error(err);
          this.hasError = true;
          return EMPTY;
        })
      )
      .subscribe((data: People) => {
        this.data = data;
      });
  }

  loadCharacter(id: string) {
    this.router.navigate(['people', id]);
  }

  previousPage() {
    this.dataService.loadPreviousPage(this.data).subscribe((data: People) => {
      this.data = data;
      this.currentPage--;
    });
  }

  nextPage() {
    this.dataService.loadNextPage(this.data).subscribe((data: People) => {
      this.data = data;
      this.currentPage++;
    });
  }
}
