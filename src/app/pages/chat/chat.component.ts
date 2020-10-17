import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ChatService } from 'src/app/services/chat.service';
import {chat, ChatMessage} from '../../models/chat.model';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  chats: chat[] = [];
  chatMssages: ChatMessage[] = [];
  chatId: number ;

  msgText = new FormControl('');
  
  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
   
    const userId = sessionStorage.getItem('userId');

    
    this.chatService.getchatListForUser(userId)
    .then(chatsInfo => {
      if(chatsInfo) {
        this.chats = chatsInfo;
        console.log(this.chats);
        
      }
    });

    const getMsgObervable = new Observable( () => {
      setInterval(()=>{
        if(this.chatId > 0)
        {
          this.getChatMessages(this.chatId);
        }
      }, 2500);
    });
   

    getMsgObervable.subscribe();
  }

  getChatMessages(chatId: number){
    this.chatId = chatId;
    console.log('chat id ' + chatId);
    sessionStorage.setItem('activeChat', chatId.toString());
    const userId = sessionStorage.getItem('userId');
    // this.liveChat.joinRoom({
    //   userId : userId,
    //   room: chatId
    // });
    this.chatService.getchatMessages(chatId)
    .then(data => {
      if(data != null){
        this.chatMssages = data;
      }
    });

   
   // ms
    
    
  }

  createNewMessage(){
    console.log('new msg' + this.msgText.value);
    const chatId = sessionStorage.getItem('activeChat');
    const userId = sessionStorage.getItem('userId');
    const message = this.msgText.value;
    console.log('MSG ' + message);
    
    this.msgText.setValue('');
    this.chatMssages.push({
      text: message ,
      displayType: 0,
      user: Number.parseInt(userId),
      time: Date.now()
    });


    this.chatService.sendNewMessage(message , Number.parseInt(userId), Number.parseInt(chatId));

    
  }

}
