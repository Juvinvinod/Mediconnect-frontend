import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { User } from '../user/interfaces/user';
import { Dept } from '../shared/interfaces/department';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  // apiURL = 'http://localhost:3000/admin';
  apiURL = 'https://mediconnect.juvin.in/admin';
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

  //get departments
  getDepartments(): Observable<Dept[]> {
    return this.http.get<Dept[]>(this.apiURL + '/' + 'getDept').pipe(
      map((data: Dept[]) => {
        return data.map((dept, index) => ({ ...dept, index: index + 1 }));
      })
    );
  }

  //add department
  addDepartment(data: FormData): Observable<{ success: string }> {
    return this.http.post<{ success: string }>(
      this.apiURL + '/' + 'addDept',
      data
    );
  }

  //get count of user
  getCount(model: string): Observable<{ count: string }> {
    return this.http.get<{ count: string }>(
      this.apiURL + '/' + 'totalCount' + '/' + model
    );
  }

  //get all booking documents
  getBookedSlotDocs(): Observable<
    { _id: string; doctorName: string; totalBookings: number }[]
  > {
    return this.http.get<
      { _id: string; doctorName: string; totalBookings: number }[]
    >(this.apiURL + '/' + 'getBookings');
  }

  //get number of patients per department
  PatientsPerDept(): Observable<
    { _id: string; dept: string; totalBookings: number }[]
  > {
    return this.http.get<
      { _id: string; dept: string; totalBookings: number }[]
    >(this.apiURL + '/' + 'departmentSlots');
  }

  editDepartment(id: string, dept: string) {
    return this.http.put(this.apiURL + '/' + 'editDepartment' + '/' + id, dept);
  }
}
