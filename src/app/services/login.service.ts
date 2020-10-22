import { createUrlResolverWithoutPackagePrefix } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  async loginWithCredentials( username : string,  password : string){
      const url = "http://localhost:3000/api/login/user";
      const result = await axios.post(url , {
       userName : username,
       password: password

      });

      if(result.data.status == "Success"){
        sessionStorage.setItem("userId" , result.data.userId)
        return true;
      }
      else {
        return false;
      }
      

  }

  async getAllUsers(){
    const userInfoList = [];
    const url = "http://localhost:3000/api/login/allUsers";
    const result = await axios.get(url);
    if (result.status === 200) {
        result.data.forEach(data => {
          const userInfo = {
            UserId: data.UserId,
            UserName: data.UserName,
            addeToChat: false
          }
          userInfoList.push(userInfo);
        });
      return userInfoList;
    } else { 
      return null;
    }
  }
}
