import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-profs-info',
  templateUrl: './profs-info.component.html',
  styleUrls: ['./profs-info.component.scss']
})
export class ProfsInfoComponent implements OnInit {
  @Input() hoveredProfs;

  constructor() { }

  ngOnInit(): void {
  }

}
