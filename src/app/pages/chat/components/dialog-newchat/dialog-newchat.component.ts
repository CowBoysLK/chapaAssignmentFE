import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ChatMessage } from 'src/app/models/chat.model';
import { ChatService } from '../../../../services/chat.service';
import {LoginService} from '../../../../services/login.service'
@Component({
  selector: 'app-dialog-newchat',
  templateUrl: './dialog-newchat.component.html',
  styleUrls: ['./dialog-newchat.component.scss']
})
export class DialogNewchatComponent implements OnInit {

  userInfo = [] ;
  chatName = new FormControl('');
  activeUserId : Number = 0 ;
  //newchatuers: Number [] = [] ;
  constructor(private service: LoginService , private chatService : ChatService) { }

  ngOnInit(): void {
    this.activeUserId = Number.parseInt(sessionStorage.getItem('userId'));
    this.service.getAllUsers()
      .then(data => {
        if(data){
          this.userInfo = data.filter(user => user.UserId !== this.activeUserId);

        }
      })
  }

  AddUserTochat(userId : number){
    // this.newchatuers.push(userId);
    // console.log(this.newchatuers);

    this.userInfo.forEach(user => {
      if(user.UserId == userId){        
            user.addeToChat = !user.addeToChat;
      }
    });
    console.log(this.userInfo);
    
    
  }

  CreateNewChat(){
   // const userids : Number[] = [] ;

    const userids : Number[] = this.userInfo
        .filter(user => user.addeToChat == true)
        .map(user => user.UserId);
    userids.push(this.activeUserId);
    const name : string  =  this.chatName.value || 'default chat';

    console.log(userids);

    console.log('name : ' + name);
    
    this.chatService.createNewChat(name , userids);
    

  }
}
