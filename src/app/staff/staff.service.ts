import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StaffService {
  apiURL = 'http://localhost:3000/staff';
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
}
