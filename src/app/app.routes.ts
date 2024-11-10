import { Routes } from '@angular/router';
import { DoctorPortalComponent } from './doctor-portal/doctor-portal.component';
import { PatientEmergencyComponent } from './patient-emergency/patient-emergency.component';


export const routes: Routes = [
    { path: '', redirectTo: '/emergency', pathMatch: 'full' },
  { path: 'emergency', component: PatientEmergencyComponent },
  { path: 'doctor-portal', component: DoctorPortalComponent },
];
