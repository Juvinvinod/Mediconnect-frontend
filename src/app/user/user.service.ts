import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './interfaces/user';
import { Observable, map } from 'rxjs';
import { Slot } from '../shared/interfaces/slot';
import { Doctor } from '../shared/interfaces/doctor';
import { Chat } from '../shared/interfaces/chat';
import { Message } from '../shared/interfaces/message';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // apiURL = 'http://localhost:3000';
  apiURL = 'https://mediconnect.juvin.in';

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

  //get chat with the doctor
  startChat(id: string): Observable<Chat[]> {
    return this.http.post<Chat[]>(this.apiURL + '/chat', { docId: id });
  }

  //get messages of chat
  getMessages(id: string): Observable<Message[]> {
    return this.http.get<Message[]>(this.apiURL + '/chat/messages/' + id);
  }

  //send messages
  sendMessages(chat_id: string, content: string): Observable<Message[]> {
    return this.http.post<Message[]>(this.apiURL + '/chat/messages', {
      chat_id: chat_id,
      text: content
    });
  }

  //get chats belonging to doctor
  getDocChats(): Observable<Chat[]> {
    return this.http.get<Chat[]>(this.apiURL + '/chat/allDoctorChats');
  }

  //get slot data
  getSlotData(_id: string): Observable<Slot[]> {
    return this.http.get<Slot[]>(this.apiURL + '/getSlot/' + _id);
  }

  //cancelBooking
  cancelSlot(id: string): Observable<{ success: string }> {
    return this.http.put<{ success: string }>(this.apiURL + '/cancelSlot', {
      id: id
    });
  }

  //check if email exists
  emailCheck(formData: { email: string }): Observable<{ success: string }> {
    return this.http.post<{ success: string }>(
      this.apiURL + '/forgetPassword',
      formData
    );
  }

  // reset password
  resetPassword(
    form: { password: string },
    token: string
  ): Observable<{ success: string }> {
    return this.http.post<{ success: string }>(
      this.apiURL + '/forgetPassword' + '/' + token,
      form
    );
  }

  //verify user mail
  verifyMail(id: string): Observable<{ success: string }> {
    return this.http.get<{ success: string }>(
      this.apiURL + '/email' + '/' + id
    );
  }
}
