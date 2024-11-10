import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientEmergencyComponent } from './patient-emergency.component';

describe('PatientEmergencyComponent', () => {
  let component: PatientEmergencyComponent;
  let fixture: ComponentFixture<PatientEmergencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientEmergencyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientEmergencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
