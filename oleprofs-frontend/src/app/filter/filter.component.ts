import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  @Input() courses: any;
  @Input() label: string;
  @Input() placeholder: string;
  @Input() columnsToFilter: string;


  constructor() { }

  ngOnInit(): void {

  }

  applyFilter(event: Event) {
    let filterValue = (event.target as HTMLInputElement).value;
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults 
    this.courses.filter = filterValue
  }
}
