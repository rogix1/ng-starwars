import { Component, OnInit } from '@angular/core';
import { CharacterResponse, Planet, PlanetResponse } from '../model';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { BreadcrumbComponent, BreadcrumbItem } from '../breadcrumb/breadcrumb.component';
import { CommonModule } from '@angular/common';
import { catchError, EMPTY } from 'rxjs';

@Component({
  selector: 'app-planet',
  templateUrl: './planet.component.html',
  styleUrls: ['./planet.component.sass'],
  standalone: true,
  imports: [CommonModule, BreadcrumbComponent],
})
export class PlanetComponent implements OnInit {
  planetId: string | null = '';
  planetDescription: Planet | undefined;
  id: string | null = '';
  name: string | undefined;
  breadcrumbItems: BreadcrumbItem[] = [];
  hasError = false;

  constructor(private route: ActivatedRoute, private router: Router, private dataService: DataService) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      if (!this.id) {
        return;
      }
      this.planetId = params.get('planetId');
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
          this.name = character.result.properties.name;
          this.breadcrumbItems = [
            { label: 'characters', link: '/people' },
            { label: this.name, link: '/people/' + this.id },
            { label: 'planet', link: '#' },
          ];
          this.dataService
            .loadPlanet(character.result.properties.homeworld)
            .pipe(
              catchError(err => {
                console.error(err);
                this.hasError = true;
                return EMPTY;
              })
            )
            .subscribe((planetResponse: PlanetResponse) => {
              this.planetDescription = planetResponse.result.properties;
            });
        });
    });
  }
}
