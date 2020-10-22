import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../../../services/login.service'
@Component({
  selector: 'app-dialog-newchat',
  templateUrl: './dialog-newchat.component.html',
  styleUrls: ['./dialog-newchat.component.scss']
})
export class DialogNewchatComponent implements OnInit {

  userInfo = [] ;
  newchatuers: Number [] = [] ;
  constructor(private service: LoginService) { }

  ngOnInit(): void {
    this.service.getAllUsers()
      .then(data => {
        if(data){
          this.userInfo = data;
        }
      })
  }

  AddUserTochat(userId : number){
    this.newchatuers.push(userId);
    console.log(this.newchatuers);

    this.userInfo.forEach(user => {
      if(user.UserId == userId){        
            user.addeToChat = true;
      }
    });
    console.log(this.userInfo);
    
    
  }

}
