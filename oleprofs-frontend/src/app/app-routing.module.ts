import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoursesTableComponent } from './courses-table/courses-table.component'
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
