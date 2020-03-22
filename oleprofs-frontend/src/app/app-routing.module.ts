import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoursesTableComponent } from './courses-table/courses-table.component'

const routes: Routes = [
  {
    path: "",
    component: CoursesTableComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
