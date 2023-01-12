import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DataService } from '../data.service';
import { CharacterDescription, CharacterResponse, Planet, PlanetResponse } from '../model';
import { BreadcrumbComponent, BreadcrumbItem } from '../breadcrumb/breadcrumb.component';
import { CommonModule } from '@angular/common';
import { catchError, EMPTY } from 'rxjs';

@Component({
  selector: 'app-people',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.sass'],
  standalone: true,
  imports: [CommonModule, RouterModule, BreadcrumbComponent],
})
export class CharacterComponent implements OnInit {
  id: string | null = '';
  characterDescription: CharacterDescription | undefined;
  planetId: string | null = '';
  planetDescription: Planet | undefined;
  breadcrumbItems: BreadcrumbItem[] = [];
  hasError = false;

  constructor(private route: ActivatedRoute, private router: Router, private dataService: DataService) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      if (!this.id) {
        return;
      }
      this.dataService
        .loadCharacter(this.id)
        .pipe(
          catchError(err => {
            console.error(err);
            this.breadcrumbItems = [
              { label: 'characters', link: '/people' },
              { label: this.id || '', link: '#' },
            ];
            this.hasError = true;
            return EMPTY;
          })
        )
        .subscribe((character: CharacterResponse) => {
          this.characterDescription = character.result.properties;

          this.breadcrumbItems = [
            { label: 'characters', link: '/people' },
            { label: this.characterDescription.name, link: '#' },
          ];

          this.dataService
            .loadPlanet(character.result.properties.homeworld)
            .pipe(
              catchError(err => {
                console.error(err);
                return EMPTY;
              })
            )
            .subscribe((planetResponse: PlanetResponse) => {
              this.planetDescription = planetResponse.result.properties;
            });
        });
    });
  }

  showPlanet() {
    this.router.navigate(['people', this.id, 'planet']);
  }
}
