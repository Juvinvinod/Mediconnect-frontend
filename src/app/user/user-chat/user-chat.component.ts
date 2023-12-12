import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';
import { Chat } from 'src/app/shared/interfaces/chat';
import { Message } from 'src/app/shared/interfaces/message';
import { FormControl } from '@angular/forms';
import { WebSocketService } from 'src/app/web-socket.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-chat',
  templateUrl: './user-chat.component.html',
  styleUrls: ['./user-chat.component.css']
})
export class UserChatComponent implements OnInit, OnDestroy {
  chatSubscription: Subscription | undefined = undefined;
  paramsSubscription: Subscription | undefined = undefined;
  startChatSubscription: Subscription | undefined = undefined;
  messageSubscription: Subscription | undefined = undefined;
  socketSubscription: Subscription | undefined = undefined;
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
    this.paramsSubscription = this.route.params.subscribe((params) => {
      this.doctorId = params['id'];
    });
    this.chatSubscription = this.userService
      .startChat(this.doctorId)
      .subscribe({
        next: (res) => {
          this.chatData = res;
          this.getChatData();
          this.setChatRoom();
          this.listenSocket();
        }
      });
  }

  updateChatInfo() {
    this.startChatSubscription = this.userService
      .startChat(this.doctorId)
      .subscribe({
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

  getChatData() {
    if (this.chatData[0]._id) {
      this.messageSubscription = this.userService
        .getMessages(this.chatData[0]._id)
        .subscribe({
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
      this.messageSubscription = this.userService
        .sendMessages(chatId, message)
        .subscribe({
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

  ngOnDestroy(): void {
    if (this.chatSubscription) {
      this.chatSubscription.unsubscribe();
    }
    if (this.paramsSubscription) {
      this.paramsSubscription.unsubscribe();
    }
    if (this.socketSubscription) {
      this.paramsSubscription?.unsubscribe();
    }
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }
    if (this.startChatSubscription) {
      this.startChatSubscription.unsubscribe();
    }
  }
}
