import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Staff } from '../shared/interfaces/staff';
import { Observable, map } from 'rxjs';
import { Slot } from '../shared/interfaces/slot';

@Injectable({
  providedIn: 'root'
})
export class StaffService {
  // apiURL = 'http://localhost:3000/staff';
  apiURL = 'https://mediconnect.juvin.in/staff';

  constructor(private http: HttpClient) {}

  //staff verification on login
  staffLogin(inputData: { email: string; password: string }) {
    return this.http.post(this.apiURL + '/' + 'login', inputData);
  }

  staffLoggedIn() {
    const staffDoc = localStorage.getItem('user');
    if (staffDoc) {
      const staffObject = JSON.parse(staffDoc);
      if (staffObject.token && staffObject.role === 'staff') {
        return true;
      }
    }
    return false;
  }

  getStaffProfile(): Observable<Staff> {
    return this.http.get<Staff>(this.apiURL + '/' + 'profile');
  }

  //update password of doctor
  updatePassword(data: Staff): Observable<{ success: string }> {
    return this.http.put<{ success: string }>(
      this.apiURL + '/' + 'password',
      data
    );
  }

  getAllBookings(): Observable<Slot[]> {
    return this.http.get<Slot[]>(this.apiURL + '/' + 'bookings').pipe(
      map((data: Slot[]) => {
        return data.map((user, index) => ({ ...user, index: index + 1 }));
      })
    );
  }
}
