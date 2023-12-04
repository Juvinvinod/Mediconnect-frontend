import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';
import { Chat } from 'src/app/shared/interfaces/chat';
import { Message } from 'src/app/shared/interfaces/message';
import { FormControl } from '@angular/forms';
import { WebSocketService } from 'src/app/web-socket.service';

@Component({
  selector: 'app-user-chat',
  templateUrl: './user-chat.component.html',
  styleUrls: ['./user-chat.component.css']
})
export class UserChatComponent implements OnInit {
  doctorId = '';
  chatData: Chat[] = [];
  messages: Message[] = [];
  messageControl = new FormControl('');

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private webSocketService: WebSocketService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.doctorId = params['id'];
    });
    this.userService.startChat(this.doctorId).subscribe({
      next: (res) => {
        this.chatData = res;
        this.getChatData();
        this.setChatRoom();
        this.listenSocket();
      }
    });
  }

  updateChatInfo() {
    this.userService.startChat(this.doctorId).subscribe({
      next: (res) => {
        this.chatData = res;
      }
    });
  }

  setChatRoom() {
    if (this.chatData[0]._id) {
      this.webSocketService.setChatId(this.chatData[0]._id);
      console.log(this.webSocketService.chatId);
    }
  }

  listenSocket() {
    if (this.chatData[0]._id) {
      this.webSocketService.listen().subscribe((data) => this.updateChat(data));
    }
  }

  updateChat(data: any): void {
    if (!data) return;
    this.messages.push(data);
    this.updateChatInfo();
  }

  getChatData() {
    if (this.chatData[0]._id) {
      this.userService.getMessages(this.chatData[0]._id).subscribe({
        next: (res) => {
          this.messages = res;
        }
      });
    }
  }

  sendMessage() {
    const message = this.messageControl.value;
    const chatId = this.chatData[0]._id;
    if (message && chatId) {
      this.userService.sendMessages(chatId, message).subscribe({
        next: (res) => {
          console.log(res);
        }
      });
      this.webSocketService.emit({
        chatId: this.chatData[0]._id,
        text: message,
        sender_id: this.chatData[0].user_id
      });
      this.messageControl.setValue('');
    }
  }

  trackById(index: number, message: Message) {
    return message._id;
  }
}
