import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MapComponent} from './map.component';
import {PagesModule} from '@app/pages/pages.module';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {CacheInterceptor} from '@shared/interceptor/cache.interceptor';

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
    ],
    providers: [
      { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true }
    ]
  }
)
export class MapRoutingModule {}
