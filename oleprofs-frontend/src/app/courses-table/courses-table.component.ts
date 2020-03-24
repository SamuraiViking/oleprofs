import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import SPRING_2019_COURSES from '../../static/20193'
import { Course } from '../../static/Course'

@Component({
  selector: 'app-courses-table',
  templateUrl: './courses-table.component.html',
  styleUrls: ['./courses-table.component.scss']
})

export class CoursesTableComponent implements OnInit {
  displayedColumns: string[] = ['name', 'gereqs', 'offerings'];
  @Input() courses: any;
  @Output() setHoveredCourse: EventEmitter<any> = new EventEmitter();
  @Input() hoveredCourse: Course;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.courses.filter = filterValue.trim().toLowerCase();
  }

  onMouseEnter(event: Event, course: Course) {
    event.target.style.background = "#eee"
    this.setHoveredCourse.emit(course)
  }

  onMouseLeave(event: Event) {
    event.target.style.background = "white";
  }

  constructor() { }

  ngOnInit(): void {
  }

}
