import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './components/loading/loading.component';
import { MapComponent } from './components/map/map.component';
import { ClarityModule } from '@clr/angular';

@NgModule({
  declarations: [LoadingComponent, MapComponent],
  exports: [LoadingComponent, MapComponent],
  imports: [CommonModule, ClarityModule],
})
export class SharedModule {}
