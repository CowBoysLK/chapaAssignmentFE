import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import {chat, ChatMessage} from '../../models/chat.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogNewchatComponent } from './components/dialog-newchat/dialog-newchat.component';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  chats: chat[] = [];
  chatMssages: ChatMessage[] = [];

  constructor(private chatService: ChatService, public dialog: MatDialog) { }

  openDialogNewChat() {
    this.dialog.open(DialogNewchatComponent);

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    // });
  }

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
