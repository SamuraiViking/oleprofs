import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoursesTableComponent } from './courses-table/courses-table.component';
import { MatInputModule } from '@angular/material/input';
import { HomeComponent } from './home/home.component';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CourseInfoComponent } from './course-info/course-info.component';
import { ProfsInfoComponent } from './profs-info/profs-info.component';
import { FilterComponent } from './filter/filter.component';

@NgModule({
  declarations: [
    AppComponent,
    CoursesTableComponent,
    HomeComponent,
    CourseInfoComponent,
    ProfsInfoComponent,
    FilterComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatExpansionModule,
    MatInputModule,
    MatSelectModule,
    HttpClientModule,
    MatCardModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
