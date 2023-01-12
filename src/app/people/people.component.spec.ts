import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleComponent } from './people.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DataService } from '../data.service';
import { peopleMock } from './people.mock';
import { of } from 'rxjs';

describe('PeopleComponent', () => {
  let component: PeopleComponent;
  let fixture: ComponentFixture<PeopleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [
        {
          provide: DataService,
          useValue: {
            loadPeople: () => of(peopleMock),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows data', () => {
    expect(fixture.nativeElement.querySelector('#dataResults > div.link').innerHTML).toBe(' Luke Skywalker ');
    expect(fixture.nativeElement.querySelectorAll('#dataResults > div.link')).toHaveLength(10);
  });
});
