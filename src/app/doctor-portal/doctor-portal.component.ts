import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import {MatDividerModule} from '@angular/material/divider';
import { HttpClient } from '@angular/common/http';
import { MatCheckboxModule } from '@angular/material/checkbox';


@Component({
  selector: 'app-doctor-portal',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, FormsModule,CommonModule,MatDividerModule,MatCheckboxModule],
  templateUrl: './doctor-portal.component.html',
  styleUrl: './doctor-portal.component.css'
})
export class DoctorPortalComponent {
  emergencies = [
    { name: 'John Doe', phone: '1234567890', location: 'Room 101' },
    { name: 'Jane Smith', phone: '9876543210', location: 'Room 202' },
  ];

  isAvailable: boolean = false;

  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.getEmergencies();  // Fetch the list of emergencies on component initialization
  }
  getEmergencies(): void {
    this.http.get<any[]>('https://your-backend-api.com/api/emergencies').subscribe(
      (data) => {
        this.emergencies = data;
      },
      (error) => {
        console.error('Error fetching emergencies:', error);
      }
    );
  }

  videoCall(emergency: any) {
    console.log('Starting video call with', emergency.name);
    // Trigger video call logic
  }

  toggleAvailability() {
    if (this.isAvailable) {
      console.log('Doctor marked as available');
      // API call to mark doctor as available
    } else {
      console.log('Doctor marked as unavailable');
      // API call to mark doctor as unavailable
    }
  }

  trackByEmergency(index: number, emergency: any): string {
    return emergency.id; // Assuming 'id' is a unique identifier for each emergency
  }
}
