import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { User } from '../user/interfaces/user';

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

  adminLoggedIn() {
    const userDoc = localStorage.getItem('user');
    if (userDoc) {
      const userObject = JSON.parse(userDoc);
      if (userObject.token && userObject.role === 'admin') {
        return true;
      }
    }
    return false;
  }

  // get all the users from database
  getUsers(): Observable<Array<User>> {
    return this.http.get<Array<User>>(this.apiURL + '/' + 'users').pipe(
      map((data: User[]) => {
        return data.map((user, index) => ({ ...user, index: index + 1 }));
      })
    );
  }

  // update userDetails
  updateUser(id: string, data: User): Observable<User> {
    return this.http.put<User>(
      this.apiURL + '/' + 'editUsers' + '/' + id,
      data
    );
  }

  //blockUser
  blockUser(id: string): Observable<{ success: string }> {
    const requestBody = { id: id };
    return this.http.patch<{ success: string }>(
      this.apiURL + '/' + 'blockUser',
      requestBody
    );
  }

  //unblockUser
  unBlockUser(id: string): Observable<{ success: string }> {
    const requestBody = { id: id };
    return this.http.patch<{ success: string }>(
      this.apiURL + '/' + 'unblockUser',
      requestBody
    );
  }
}
