import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings/settings.component';
import { RouterModule, Routes } from '@angular/router';
import { RoutesComponent } from './routes/routes.component';
import { MapComponent } from './map/map.component';

const routes: Routes = [
  {
    path: 'settings',
    component: SettingsComponent,
  },
  {
    path: 'routes',
    component: RoutesComponent,
  },
  {
    path: 'map',
    loadChildren: () => import('./map/map-routing.module').then((m) => m.MapRoutingModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
