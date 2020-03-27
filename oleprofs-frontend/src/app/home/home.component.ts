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
  gereqsFilter = new FormControl();
  departmentFilter = new FormControl();
  hoveredCourse: Course = SPRING_2020_COURSES[0]
  globalFilter = '';

  filteredValues = {
    gereqs: '', department: '',
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

    this.gereqsFilter.valueChanges.subscribe((gereqsFilterValue) => {
      this.filteredValues['gereqs'] = gereqsFilterValue;
      this.courses.filter = JSON.stringify(this.filteredValues);
    });

    this.departmentFilter.valueChanges.subscribe((departmentFilterValue) => {
      this.filteredValues['department'] = departmentFilterValue;
      this.courses.filter = JSON.stringify(this.filteredValues);
    });

    this.courses.filterPredicate = this.customFilterPredicate();
  }

  customFilterPredicate() {
    const myFilterPredicate = (data: Course, filter: string): boolean => {
      var globalMatch = !this.globalFilter;

      if (this.globalFilter) {
        // search all text fields
        globalMatch = data.gereqs.toString().trim().toLowerCase().indexOf(this.globalFilter.toLowerCase()) !== -1;
      }

      if (!globalMatch) {
        return;
      }

      let searchString = JSON.parse(filter);
      return data.gereqs.toString().trim().toLowerCase().indexOf(searchString.gereqs.toLowerCase()) !== -1 &&
        data.department.toString().trim().toLowerCase().indexOf(searchString.department.toLowerCase()) !== -1;
    }
    return myFilterPredicate;
  }

}
