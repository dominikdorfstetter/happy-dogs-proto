import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { MainComponent } from './main/main.component';
import { MenuComponent } from './menu/menu.component';
import { ClarityModule } from '@clr/angular';
import { SidenavComponent } from './sidenav/sidenav.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [FooterComponent, MainComponent, MenuComponent, SidenavComponent],
  imports: [CommonModule, ClarityModule, RouterModule],
  exports: [FooterComponent, MainComponent, MenuComponent, SidenavComponent],
})
export class LayoutModule {}
