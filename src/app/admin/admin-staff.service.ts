import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Staff } from '../shared/interfaces/staff';

@Injectable({
  providedIn: 'root'
})
export class AdminStaffService {
  // apiURL = 'http://localhost:3000/staff';
  apiURL = 'https://mediconnect.juvin.in/staff';
  constructor(private http: HttpClient) {}

  //add new staff
  addStaffs(data: Staff): Observable<{ success: string }> {
    return this.http.post<{ success: string }>(
      this.apiURL + '/' + 'signup',
      data
    );
  }

  // get all staffs from database
  getStaffs(): Observable<Array<Staff>> {
    return this.http.get<Array<Staff>>(this.apiURL + '/' + 'staffs').pipe(
      map((data: Staff[]) => {
        return data.map((user, index) => ({ ...user, index: index + 1 }));
      })
    );
  }

  // update staffDetails
  updateStaff(id: string, data: Staff): Observable<Staff> {
    return this.http.put<Staff>(
      this.apiURL + '/' + 'editStaff' + '/' + id,
      data
    );
  }

  //blockStaff
  blockStaff(id: string): Observable<{ success: string }> {
    const requestBody = { id: id };
    return this.http.patch<{ success: string }>(
      this.apiURL + '/' + 'blockStaff',
      requestBody
    );
  }

  //unblockStaff
  unBlockStaff(id: string): Observable<{ success: string }> {
    const requestBody = { id: id };
    return this.http.patch<{ success: string }>(
      this.apiURL + '/' + 'unblockStaff',
      requestBody
    );
  }
}
