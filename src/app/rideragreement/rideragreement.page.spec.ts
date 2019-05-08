import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RideragreementPage } from './rideragreement.page';

describe('RideragreementPage', () => {
  let component: RideragreementPage;
  let fixture: ComponentFixture<RideragreementPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RideragreementPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RideragreementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
