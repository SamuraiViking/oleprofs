import { Component, OnInit } from '@angular/core';
import SPRING_2020_COURSES from '../../static/20203'
import { MatTableDataSource } from '@angular/material/table';
import { Course } from '../../static/Course'
import profs from '../../static/profsData'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  courses = new MatTableDataSource(SPRING_2020_COURSES)
  hoveredCourse: Course = SPRING_2020_COURSES[0]
  hoveredProfs = []

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
  }

}
