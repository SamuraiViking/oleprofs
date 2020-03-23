import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import SPRING_2019_COURSES from '../../static/20193'

@Component({
  selector: 'app-courses-table',
  templateUrl: './courses-table.component.html',
  styleUrls: ['./courses-table.component.scss']
})

export class CoursesTableComponent implements OnInit {
  displayedColumns: string[] = ['name', 'gereqs', 'offerings'];
  dataSource = new MatTableDataSource(SPRING_2019_COURSES);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor() { }

  ngOnInit(): void {
  }

}
