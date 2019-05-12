import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnewayPage } from './oneway.page';

describe('OnewayPage', () => {
  let component: OnewayPage;
  let fixture: ComponentFixture<OnewayPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnewayPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnewayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
