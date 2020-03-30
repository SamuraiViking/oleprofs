import { Component, OnInit } from '@angular/core';
import FALL_2020_COURSES from '../../static/terms/20201'
import INTERIM_2020_COURSES from '../../static/terms/20202'
import SPRING_2020_COURSES from '../../static/terms/20203'
import { MatTableDataSource } from '@angular/material/table';
import { Course } from '../interfaces/Course'
import profs from '../../static/profsData'
import { FormControl } from '@angular/forms';
import terms from '../../static/filter-options/terms'
import statusOptions from '../../static/filter-options/status'
import departmentOptions from '../../static/filter-options/departments'
import gereqOptions from '../../static/filter-options/gereps'


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
  hoveredProfs;
  terms = terms;
  statusOptions = statusOptions;
  departmentOptions = departmentOptions;
  gereqOptions = gereqOptions;

  selectedGereq = ''
  selectedDepartment = ''
  selectedTerm = '20191'
  selectedStatus = ''

  filterValues = {
    status: "",
    department: "",
    gereqs: "",
    global: "",
  }

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

  customfilterPredicate(data: Course, filter: string): boolean {
    filter = JSON.parse(filter);
    return data.status.toLowerCase().includes(filter['status']) &&
      data.department.toLowerCase().includes(filter['department']) &&
      data.gereqs.toString().toLowerCase().includes(filter['gereqs']) &&
      (data.status.toLowerCase().includes(filter['globalFilter']) ||
        data.gereqs.toString().toLowerCase().includes(filter['globalFilter']) ||
        data.department.toLowerCase().includes(filter['globalFilter']) ||
        data.offerings.toString().toLowerCase().includes(filter['globalFilter']) ||
        data.name.toLowerCase().includes(filter['globalFilter']) ||
        data.instructors.toString().toLowerCase().includes(filter['globalFilter']))
  }

  ngOnInit(): void {
    this.setHoveredProfs()
    this.courses.filterPredicate = this.customfilterPredicate
  }

  changeGereqs(gereq) {
    const newGereq = gereq.value;
    this.selectedGereq = newGereq;
    this.applyFilter();
  }

  changeTerm(event: Event) {
    const selectedTermToCoursesData = {
      20191: FALL_2020_COURSES,
      20192: INTERIM_2020_COURSES,
      20193: SPRING_2020_COURSES,
    }

    const coursesData = selectedTermToCoursesData[this.selectedTerm]
    this.courses = new MatTableDataSource(coursesData);
    this.courses.filterPredicate = this.customfilterPredicate
    this.applyFilter()
  }

  changeGlobalFilter(event: Event) {

    const newGlobalFilter = (event.target as HTMLInputElement).value;
    this.globalFilter = newGlobalFilter
    this.applyFilter()
  }

  applyFilter() {

    const filterValues = {
      status: this.selectedStatus.toLowerCase(),
      department: this.selectedDepartment.toLowerCase(),
      gereqs: this.selectedGereq.toLowerCase(),
      globalFilter: this.globalFilter.toLowerCase(),
    }
    this.courses.filter = JSON.stringify(filterValues);
  }
}
