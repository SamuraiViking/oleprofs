import { Component, OnInit } from '@angular/core';
import SPRING_2020_COURSES from '../../static/terms/20203'
import { MatTableDataSource } from '@angular/material/table';
import { Course } from '../interfaces/Course'
import profs from '../../static/profsData'
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  courses = new MatTableDataSource(SPRING_2020_COURSES);
  nameFilter = new FormControl();
  hoveredCourse: Course = SPRING_2020_COURSES[0]
  hoveredProfs = []
  globalFilter = '';

  filteredValues = {
    name: '',
  };

  constructor() { }

  setHoveredProfs() {
    this.hoveredProfs = this.hoveredCourse.instructors.map((instructor) => {
      let profToDisplay = {}
      let profToCopy = profs[instructor]

      profToDisplay = profToCopy ?
        {
          name: instructor,
          id: profToCopy.id,
          reviews: profToCopy.reviews,
          rating: profToCopy.rating,
          difficulty: profToCopy.difficulty,
          wouldTakeAgain: profToCopy.wouldTakeAgain,
        }
        :
        {
          name: instructor,
          id: -1,
          reviews: 0,
          rating: "N/A",
          difficulty: "N/A",
          wouldTakeAgain: "N/A"
        }

      return profToDisplay
    })
  }

  setHoveredCourse(newHoveredCourse: Course): void {
    this.hoveredCourse = newHoveredCourse
    this.setHoveredProfs()
  }

  ngOnInit(): void {
    this.setHoveredProfs()

    this.nameFilter.valueChanges.subscribe((nameFilterValue) => {
      this.filteredValues['name'] = nameFilterValue;
      this.courses.filter = JSON.stringify(this.filteredValues);
    });

    this.courses.filterPredicate = this.customFilterPredicate();
  }

  customFilterPredicate() {
    const myFilterPredicate = (data: any, filter: string): boolean => {
      var globalMatch = !this.globalFilter;

      if (this.globalFilter) {
        // search all text fields
        globalMatch = data.name.toString().trim().toLowerCase().indexOf(this.globalFilter.toLowerCase()) !== -1;
      }

      if (!globalMatch) {
        return;
      }

      let searchString = JSON.parse(filter);
      return data.name.toString().trim().toLowerCase().indexOf(searchString.name.toLowerCase()) !== -1;
    }
    return myFilterPredicate;
  }

}
