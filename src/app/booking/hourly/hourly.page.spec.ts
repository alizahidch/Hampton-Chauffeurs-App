import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HourlyPage } from './hourly.page';

describe('HourlyPage', () => {
  let component: HourlyPage;
  let fixture: ComponentFixture<HourlyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HourlyPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HourlyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
