import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterComponent } from './character/character.component';
import { PlanetComponent } from './planet/planet.component';
import { PeopleComponent } from './people/people.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'people', component: PeopleComponent },
  { path: 'people/:id', component: CharacterComponent },
  { path: 'people/:id/planet', component: PlanetComponent },
  { path: '', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
