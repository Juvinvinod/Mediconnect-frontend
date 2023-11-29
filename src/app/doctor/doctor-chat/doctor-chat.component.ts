import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelectionListChange } from '@angular/material/list';
import { ActivatedRoute } from '@angular/router';
import { Chat } from 'src/app/shared/interfaces/chat';
import { Message } from 'src/app/shared/interfaces/message';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-doctor-chat',
  templateUrl: './doctor-chat.component.html',
  styleUrls: ['./doctor-chat.component.css']
})
export class DoctorChatComponent implements OnInit {
  doctorId: any;
  chatData: Chat[] = [];
  messages: Message[] = [];
  chatId = '';
  messageControl = new FormControl('');

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.userService.getDocChats().subscribe({
      next: (res) => {
        this.chatData = res;
        console.log(this.chatData);
        this.doctorId = this.chatData[0]?.doctor_id;

        // this.getChatData();
      }
    });
  }

  onChatSelectionChange(event: MatSelectionListChange) {
    this.chatId = event?.options[0].value;
    this.getChatData();
  }

  getChatData() {
    if (this.chatId) {
      this.userService.getMessages(this.chatId).subscribe({
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
      this.messageControl.setValue('');
    }
  }
}
