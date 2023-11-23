import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './interfaces/user';
import { Observable, map } from 'rxjs';
import { Slot } from '../shared/interfaces/slot';
import { Doctor } from '../shared/interfaces/doctor';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiURL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  //user registration in db
  proceedRegister(inputData: User) {
    return this.http.post(this.apiURL + '/' + 'signup', inputData);
  }

  //user verification on login
  userLogin(inputData: { email: string; password: string }) {
    return this.http.post(this.apiURL + '/' + 'login', inputData);
  }

  //get profile data of user
  getUserProfile(): Observable<User> {
    return this.http.get<User>(this.apiURL + '/' + 'profile');
  }

  userLoggedIn() {
    const userDoc = localStorage.getItem('user');
    if (userDoc) {
      const userObject = JSON.parse(userDoc);
      if (userObject.token && userObject.role === 'user') {
        return true;
      }
    }
    return false;
  }

  //update password of doctor
  updatePassword(data: User): Observable<{ success: string }> {
    return this.http.put<{ success: string }>(
      this.apiURL + '/' + 'password',
      data
    );
  }

  getToken() {
    const user = localStorage.getItem('user');
    const userObject = user ? JSON.parse(user) : null;
    const token = userObject?.token;
    return token;
  }

  getSlots(id: string): Observable<Slot[]> {
    return this.http.get<Slot[]>(this.apiURL + '/' + 'getSlots' + '/' + id);
  }

  getDoctor(id: string): Observable<Doctor> {
    return this.http.get<Doctor>(
      this.apiURL + '/' + 'doctorProfile' + '/' + id
    );
  }

  //book a slot
  bookSlot(data: {
    booking_id: string;
    time: string;
    date: string;
    doctorId: string;
  }): Observable<{ success: string }> {
    return this.http.put<{ success: string }>(
      this.apiURL + '/' + 'bookSlot',
      data
    );
  }

  //get all user booking docs
  getBookingDocs(): Observable<Slot[]> {
    return this.http.get<Slot[]>(this.apiURL + '/' + 'getSlots').pipe(
      map((data: Slot[]) => {
        return data.map((user, index) => ({ ...user, index: index + 1 }));
      })
    );
  }
}
