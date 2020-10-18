import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import  {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LiveChatService {

  constructor() { }

  // private socket = io('http://localhost:3000');

  // joinRoom (data) {
  //   this.socket.emit('join' , data);
 // }
}
