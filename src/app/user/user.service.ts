import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiURL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  proceedRegister(inputData: User) {
    console.log(inputData);

    return this.http.post(this.apiURL + '/' + 'signup', inputData);
  }
}
