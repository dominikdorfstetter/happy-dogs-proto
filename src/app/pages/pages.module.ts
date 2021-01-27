import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings/settings.component';
import { ClarityModule } from '@clr/angular';
import { UserComponent } from './user/user.component';
import { RoutesComponent } from './routes/routes.component';
import { MapComponent } from './map/map.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MapBoxComponent } from './mapbox/mapbox.component';

@NgModule({
  declarations: [
    SettingsComponent,
    UserComponent,
    RoutesComponent,
    MapComponent,
    DashboardComponent,
    NotFoundComponent,
    MapBoxComponent,
  ],
  imports: [CommonModule, ClarityModule],
  exports: [
    SettingsComponent,
    UserComponent,
    RoutesComponent,
    MapComponent,
    DashboardComponent,
    NotFoundComponent,
    MapBoxComponent,
  ],
})
export class PagesModule {}
