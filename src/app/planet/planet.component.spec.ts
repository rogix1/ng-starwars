import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlanetComponent } from './planet.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { DataService } from '../data.service';
import { planetMock } from './planet.mock';

describe('PlanetComponent', () => {
  let component: PlanetComponent;
  let fixture: ComponentFixture<PlanetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [
        {
          provide: DataService,
          useValue: {
            loadPlanet: () => of(planetMock),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PlanetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows data', async () => {
    await expect(fixture.nativeElement.querySelector('div')).toBeTruthy();
  });
});
