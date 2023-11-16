import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './interfaces/user';
import { Observable } from 'rxjs';

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
}
