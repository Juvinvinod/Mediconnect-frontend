import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Doctor } from '../shared/interfaces/doctor';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  apiURL = 'http://localhost:3000/doctor';
  constructor(private http: HttpClient) {}

  //doctor verification on login
  doctorLogin(inputData: { email: string; password: string }) {
    return this.http.post(this.apiURL + '/' + 'login', inputData);
  }

  doctorLoggedIn() {
    const docDoc = localStorage.getItem('user');
    if (docDoc) {
      const docObject = JSON.parse(docDoc);
      if (docObject.token && docObject.role === 'doctor') {
        return true;
      }
    }
    return false;
  }

  //get profile data of user
  getDoctorProfile(): Observable<Doctor> {
    return this.http.get<Doctor>(this.apiURL + '/' + 'profile');
  }

  //update password of doctor
  updatePassword(data: Doctor): Observable<{ success: string }> {
    return this.http.put<{ success: string }>(
      this.apiURL + '/' + 'password',
      data
    );
  }
}
