import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from '@app/pages/dashboard/dashboard.component';
import { NotFoundComponent } from '@app/pages/not-found/not-found.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: '/pages/map', pathMatch: 'full' },
  {
    path: 'pages',
    loadChildren: () => import('./pages/pages-routing.module').then((m) => m.PagesRoutingModule),
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
