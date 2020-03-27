import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})

export class FiltersComponent implements OnInit {
  @Input() courses: any;
  @Input() gereqsFilter;
  @Input() departmentFilter;

  constructor() { }

  ngOnInit(): void { }
}
