import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfsInfoComponent } from './profs-info.component';

describe('ProfInfoComponent', () => {
  let component: ProfsInfoComponent;
  let fixture: ComponentFixture<ProfsInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProfsInfoComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
