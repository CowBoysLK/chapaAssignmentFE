import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Injectable } from '@angular/core';
import axios from 'axios';
import { ChatMessage } from '../models/chat.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor() { }


  async getchatListForUser(userId: string){
    const url = "http://localhost:3000/api/chat/chatlist/" + userId ; 

    const result = await  axios.get(url);

    if(result.status == 200){
      return result.data;
    }
   
  }

  async getchatMessages(chatId: number){
    const url = "http://localhost:3000/api/messages/" + chatId;
    const result = await axios.get(url);
    const  messages : ChatMessage[] = [];
  
    if (result.status === 200) {

      const user = sessionStorage.getItem('userId');
      result.data.forEach(  msg => {
        if(msg.user == user){
            msg.displayType = 0;
        }
        else {
         msg.displayType = 1;
        }
        messages.push(msg);
      });


      return messages;
    } else { 
      return null;
    }
  }
}
