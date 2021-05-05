import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MapComponent} from './map.component';
import {PagesModule} from '@app/pages/pages.module';

const routes: Routes = [
  {
    path: '',
    component: MapComponent,
  },
];

@NgModule(
  {
    imports: [
      PagesModule,
      RouterModule.forChild(routes)
    ]
  }
)
export class MapRoutingModule {

  constructor() {
  }

}
