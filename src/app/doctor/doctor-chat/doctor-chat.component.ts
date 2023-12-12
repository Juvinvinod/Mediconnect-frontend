import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelectionListChange } from '@angular/material/list';
import { Chat } from 'src/app/shared/interfaces/chat';
import { Message } from 'src/app/shared/interfaces/message';
import { UserService } from 'src/app/user/user.service';
import { WebSocketService } from 'src/app/web-socket.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-doctor-chat',
  templateUrl: './doctor-chat.component.html',
  styleUrls: ['./doctor-chat.component.css']
})
export class DoctorChatComponent implements OnInit, OnDestroy {
  doctorChatSubscription: Subscription | undefined = undefined;
  socketSubscription: Subscription | undefined = undefined;
  messageSubscription: Subscription | undefined = undefined;
  doctorId: string | undefined = undefined;
  chatData: Chat[] = [];
  messages: Message[] = [];
  chatId = '';
  messageControl = new FormControl('');

  constructor(
    private userService: UserService,
    private webSocketService: WebSocketService
  ) {}

  ngOnInit(): void {
    this.updateChatInfo();
  }

  updateChatInfo() {
    this.doctorChatSubscription = this.userService.getDocChats().subscribe({
      next: (res) => {
        this.chatData = res;
        this.doctorId = this.chatData[0]?.doctor_id?._id;
        console.log(this.doctorId);
      }
    });
  }

  setChatRoom() {
    if (this.chatId) {
      this.webSocketService.setChatId(this.chatId);
    }
  }

  listenSocket() {
    if (this.chatData[0]._id) {
      this.socketSubscription = this.webSocketService
        .listen()
        .subscribe((data) => this.updateChat(data));
    }
  }

  updateChat(data: Message): void {
    if (!data) return;
    this.messages.push(data);
    this.updateChatInfo();
  }

  onChatSelectionChange(event: MatSelectionListChange) {
    this.chatId = event?.options[0].value;
    this.getChatData();
  }

  getChatData() {
    if (this.chatId) {
      this.messageSubscription = this.userService
        .getMessages(this.chatId)
        .subscribe({
          next: (res) => {
            this.messages = res;
            this.listenSocket();
            this.setChatRoom();
          }
        });
    }
  }

  sendMessage() {
    const message = this.messageControl.value;
    const chatId = this.chatData[0]._id;
    if (message && chatId) {
      this.messageSubscription = this.userService
        .sendMessages(chatId, message)
        .subscribe({
          next: () => {
            console.log('message send');
          }
        });
      this.webSocketService.emit({
        chatId: this.chatData[0]._id,
        text: message,
        sender_id: this.doctorId
      });
      this.messageControl.setValue('');
    }
  }

  trackById(index: number, chat: Chat) {
    return chat._id;
  }

  ngOnDestroy(): void {
    if (this.socketSubscription) {
      this.socketSubscription.unsubscribe();
    }
    if (this.doctorChatSubscription) {
      this.doctorChatSubscription.unsubscribe();
    }
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }
  }
}
