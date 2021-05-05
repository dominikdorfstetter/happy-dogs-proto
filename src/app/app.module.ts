import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule} from '@angular/common/http';
import { LayoutModule } from '@app/layout/layout.module';
import { SharedModule } from '@shared/shared.module';
import { ClarityModule } from '@clr/angular';
import { PagesModule } from '@app/pages/pages.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule, LayoutModule, SharedModule, PagesModule, ClarityModule],
  providers: [

  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
