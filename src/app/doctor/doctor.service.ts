import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Doctor } from '../shared/interfaces/doctor';
import { Observable, map } from 'rxjs';
import { Slot } from '../shared/interfaces/slot';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  // apiURL = 'http://localhost:3000/doctor';
  apiURL = 'https://mediconnect.juvin.in/doctor';
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

  //create a slot
  createSlot(data: Slot): Observable<{ success: string }> {
    return this.http.post<{ success: string }>(
      this.apiURL + '/' + 'createSlot',
      data
    );
  }

  //get all doctor booking docs
  getDoctorBookingDocs(): Observable<Slot[]> {
    return this.http.get<Slot[]>(this.apiURL + '/' + 'getSlots').pipe(
      map((data: Slot[]) =>
        data.filter((user: Slot) => user.status === 'booked')
      ),
      map((data: Slot[]) => {
        return data.map((user, index) => ({ ...user, index: index + 1 }));
      })
    );
  }

  //update slot status
  updateSlots(data: {
    user_id: string | undefined;
    status: string;
  }): Observable<{ success: string }> {
    return this.http.put<{ success: string }>(
      this.apiURL + '/' + 'updateSlot',
      data
    );
  }

  //get doctor created empty slots
  getDocSlots(): Observable<Slot[]> {
    return this.http.get<Slot[]>(this.apiURL + '/' + 'mySlots').pipe(
      map((data: Slot[]) => {
        return data.map((doc, index) => ({ ...doc, index: index + 1 }));
      })
    );
  }

  deleteSlot(time: string): Observable<{ success: string }> {
    return this.http.delete<{ success: string }>(
      this.apiURL + '/' + 'deleteSlot' + '/' + time
    );
  }
}
