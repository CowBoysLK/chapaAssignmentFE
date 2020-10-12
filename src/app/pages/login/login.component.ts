import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  name = new FormControl('');
  password = new FormControl('');
  constructor(private loginService: LoginService, private router: Router ){ }

  ngOnInit(): void {
  }
 


  login(){
    console.log('un and pw '+ this.name.value + ' ' + this.password.value);
    this.loginService.loginWithCredentials(this.name.value , this.password.value)
      .then(status => 
        {
          if(status){
            console.log('succesfule');
            this.router.navigate(['chat']);
          }
          else {
            console.log('error');
            
          }
        })
  }

}
