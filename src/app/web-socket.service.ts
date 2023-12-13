import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { Message } from './shared/interfaces/message';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket: Socket;
  chatId = '';
  constructor() {
    // Connect to the Socket.IO server at http://localhost:3000
    this.socket = io('https://mediconnect.juvin.in');
    this.socket.connect();
  }

  joinRoom(): void {
    this.socket.emit('setup', this.chatId);
  }

  setChatId(id: string) {
    this.chatId = id;
    console.log(this.chatId);
    this.joinRoom();
  }

  listen(): Observable<Message> {
    return new Observable((subscribe) => {
      this.socket.on('chat', (data) => {
        subscribe.next(data);
      });
    });
  }

  emit(data: any) {
    this.socket.emit('chat', data);
  }
}
