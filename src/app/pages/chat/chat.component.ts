import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import {chat, ChatMessage} from '../../models/chat.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  chats: chat[] = [];
  chatMssages: ChatMessage[] = [];
  
  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    const userId = sessionStorage.getItem('userId');
    this.chatService.getchatListForUser(userId)
    .then(chatsInfo => {
      if(chatsInfo) {
        this.chats = chatsInfo;
      }
    })
  }

  getChatMessages(chatId: number){
    console.log('chat id ' + chatId);
    this.chatService.getchatMessages(chatId)
    .then(data => {
      if(data != null){
        this.chatMssages = data;
      }
    })
    
  }

}
