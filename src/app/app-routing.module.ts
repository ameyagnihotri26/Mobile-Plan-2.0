import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutusComponent } from './aboutus/aboutus.component';
import { AppComponent } from './app.component';
import { CreateplanComponent } from './createplan/createplan.component';
import { DeleteComponent } from './delete/delete.component';
import { RedirectComponent } from './redirect/redirect.component';
import { SearchComponent } from './search/search.component';
import { UpdatePlanComponent } from './update-plan/update-plan.component';
import { ViewallComponent } from './viewall/viewall.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'redirect',
    pathMatch: 'full'
  },
  {
    path: 'redirect',
    component: RedirectComponent
  },
  {
    path: 'createplan',
    component: CreateplanComponent
  },
  {
    path: 'viewall',
    component: ViewallComponent
  },
  {
    path: 'search',
    component: SearchComponent
  },
  {
    path: 'update',
    component: UpdatePlanComponent
  },
  {
    path: 'delete',
    component: DeleteComponent
  },
  {
    path: 'aboutus',
    component: AboutusComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
