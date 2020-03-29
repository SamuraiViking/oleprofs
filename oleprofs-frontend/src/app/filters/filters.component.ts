import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import gereqsOptions from '../../static/filter-options/gereps'
import departmentOptions from '../../static/filter-options/departments'

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})

export class FiltersComponent implements OnInit {
  @Input() courses: any;
  @Input() gereqsFilter: FormControl;
  @Input() departmentFilter: FormControl;


  filteredGereqsOptions: Observable<string[]>;
  filteredDepartmentOptions: Observable<string[]>;

  gereqsOptions = gereqsOptions;
  departmentOptions = departmentOptions;

  constructor() { }

  applyFilter(event: Event) {
    let filterValue = (event.target as HTMLInputElement).value;
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults 
    this.courses.filter = filterValue
  }

  ngOnInit() {
    this.filteredGereqsOptions = this.gereqsFilter.valueChanges
      .pipe(
        startWith(''),
        map(value => this._gereqsFilter(value))
      );

    this.filteredDepartmentOptions = this.departmentFilter.valueChanges
      .pipe(
        startWith(''),
        map(value => this._departmentFilter(value))
      );

  }

  private _gereqsFilter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.gereqsOptions.filter(option => option.toLowerCase().includes(filterValue));
  }

  private _departmentFilter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.departmentOptions.filter(option => option.toLowerCase().includes(filterValue));
  }

}
