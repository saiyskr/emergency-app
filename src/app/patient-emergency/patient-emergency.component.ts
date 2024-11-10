import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
declare var google: any;
@Component({
  selector: 'app-patient-emergency',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, FormsModule,CommonModule],
  templateUrl: './patient-emergency.component.html',
  styleUrl: './patient-emergency.component.css'
})
export class PatientEmergencyComponent {
  name: string = '';
  phone: string = '';
  location: string = '';
  googleapikey: string = 'AIzaSyCasxIUQyY-dPERflsbQltZtoiE5twkWFQ';
  latitude: number | null = null;
  longitude: number | null = null;
  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Get the current location on component initialization
    this.getCurrentLocation();
  }

  // Get the current location of the user
  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          this.getAddressFromCoordinates(this.latitude , this.longitude);
          // this.location = `Lat: ${latitude}, Long: ${longitude}`;
        },
        (error) => {
          console.error('Error getting location', error);
          this.location = 'Location unavailable';
        }
      );
    } else {
      this.location = 'Geolocation not supported';
    }
  }
  getAddressFromCoordinates(lat: number, lng: number) {
    const geocoder = new google.maps.Geocoder();
    const latLng = new google.maps.LatLng(lat, lng);

    geocoder.geocode({ 'location': latLng }, (results: { formatted_address: string; }[], status: string) => {
      if (status === 'OK') {
        if (results[0]) {
          this.location = results[0].formatted_address;  // Get the address from the geocoding results
        } else {
          alert('No address found for this location.');
        }
      } else {
        alert('Geocoder failed due to: ' + status);
      }
    });
  }
  // Send Notification to the API
  sendNotification() {
    const emergencyData = {
      name: this.name,
      phone: this.phone,
      location: this.location
    };

    // Assuming your backend API URL is '/api/emergency'
    this.http.post('https://your-backend-api.com/api/emergency', emergencyData)
      .subscribe(
        response => {
          console.log('Notification sent successfully:', response);
        },
        error => {
          console.error('Error sending notification:', error);
        }
      );
  }

  // Placeholder method for video call functionality
  videoCall() {
    console.log('Video call initiated');
  }
}