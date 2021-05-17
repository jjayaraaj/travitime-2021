import { EditTourComponent } from './operator/dashboard/tour/edit-tour/edit-tour.component';
import { NewTourComponent } from './operator/dashboard/tour/new-tour/new-tour.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TourComponent } from './operator/dashboard/tour/tour.component';
import { DashboardComponent } from './operator/dashboard/dashboard.component';
import { AuthComponent } from './travel-operators/auth/auth.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGaurd } from './service/auth.gaurd';


const routes: Routes = [
  {path:'', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path:'travel-operators', component: AuthComponent},
  // {path: 'operator/dashboard/newtour', component: TourComponent, canActivate: [AuthGaurd]},
  {path: 'operator/dashboard', component: DashboardComponent,
  canActivate: [AuthGaurd],
  //canActivateChild : [AuthGaurd], //only child route will be gaurded
   children: [
    {path: 'tour', component: TourComponent},
    {path: 'tour/:id/edit', component: EditTourComponent},
    {path: 'new-tour', component: NewTourComponent}
  ]},
  {
    path: 'not-found', component: PageNotFoundComponent
  },
  {
    path: '**', redirectTo: '/not-found'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
