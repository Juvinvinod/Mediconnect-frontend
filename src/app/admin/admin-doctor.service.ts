import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Doctor } from '../shared/interfaces/doctor';

@Injectable({
  providedIn: 'root'
})
export class AdminDoctorService {
  // apiURL = 'http://localhost:3000/doctor';
  apiURL = 'https://mediconnect.juvin.in/doctor';
  constructor(private http: HttpClient) {}

  //add new doctor
  addDoctor(data: Doctor): Observable<{ success: string }> {
    return this.http.post<{ success: string }>(
      this.apiURL + '/' + 'signup',
      data
    );
  }

  // get all doctors from database
  getDoctors(): Observable<Array<Doctor>> {
    return this.http.get<Array<Doctor>>(this.apiURL + '/' + 'doctors').pipe(
      map((data: Doctor[]) => {
        return data.map((user, index) => ({ ...user, index: index + 1 }));
      })
    );
  }

  // update userDetails
  updateDoctor(id: string, data: Doctor): Observable<Doctor> {
    return this.http.put<Doctor>(
      this.apiURL + '/' + 'editDoctor' + '/' + id,
      data
    );
  }

  //blockUser
  blockDoctor(id: string): Observable<{ success: string }> {
    const requestBody = { id: id };
    return this.http.patch<{ success: string }>(
      this.apiURL + '/' + 'blockDoctor',
      requestBody
    );
  }

  //unblockUser
  unBlockDoctor(id: string): Observable<{ success: string }> {
    const requestBody = { id: id };
    return this.http.patch<{ success: string }>(
      this.apiURL + '/' + 'unblockDoctor',
      requestBody
    );
  }
}
