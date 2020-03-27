import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.scss']
})
export class CourseInfoComponent implements OnInit {

  @Input() hoveredCourse;

  constructor() { }

  ngOnInit(): void {
  }

}
