import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  apiURL = 'http://localhost:3000/admin';
  constructor(private http: HttpClient) {}

  //admin verification on login
  adminLogin(inputData: { email: string; password: string }) {
    return this.http.post(this.apiURL + '/' + 'login', inputData);
  }

  loggedIn() {
    const userDoc = localStorage.getItem('user');
    if (userDoc) {
      const userObject = JSON.parse(userDoc);
      if (userObject.token) {
        return true;
      }
    }
    return false;
  }
}
