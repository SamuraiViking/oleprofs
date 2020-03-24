import { Component, OnInit } from '@angular/core';
import SPRING_2020_COURSES from '../../static/20203'
import { MatTableDataSource } from '@angular/material/table';
import { Course } from '../../static/Course'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  courses = new MatTableDataSource(SPRING_2020_COURSES)
  hoveredCourse: Course = SPRING_2020_COURSES[0]

  constructor() { }

  setHoveredCourse(newHoveredCourse: Course): void {
    this.hoveredCourse = newHoveredCourse
  }

  ngOnInit(): void {

  }

}
