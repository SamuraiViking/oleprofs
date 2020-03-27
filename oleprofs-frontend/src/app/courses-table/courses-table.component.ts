import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Course } from '../../static/Course'
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

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
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.courses.filter = filterValue.trim().toLowerCase();
  }

  onMouseEnter(event: Event, course: Course) {
    event.target['style'].background = "#eee"
    this.setHoveredCourse.emit(course)
  }

  onMouseLeave(event: Event) {
    event.target['style'].background = "white";
  }

  constructor() { }

  ngOnInit(): void {
    console.log(this.courses)
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

}
