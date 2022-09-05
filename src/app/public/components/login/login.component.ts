import { Component } from '@angular/core';
import { ITS_JUST_ANGULAR } from '@angular/core/src/r3_symbols';
import { Router } from '@angular/router';
import { AuthService, IUser } from 'src/app/core/services/auth.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  PARAM_USER: string = "user"; PARAM_SESSION: string = "session"
  isDisabledBtnSend: boolean; isWaitingOTP: boolean;
  lblCounter: string; user: IUser;

  constructor(private authService: AuthService, private router: Router) {
    this.isDisabledBtnSend=false;
    this.isWaitingOTP=false;
    this.lblCounter='';
    this.user={} as IUser;

    authService.verifyUser().then(
      (res: boolean) => {
        if(res) {
          router.navigateByUrl('/home');
        }
      }
    );
  }
  
  signIn = (user: IUser) => {
    this.isDisabledBtnSend=true;
    this.isWaitingOTP=true;
    this.freezeButton();
    this.authService.signIn(user);
  };
    
  verifyOTP = (user: IUser) => {
    this.authService.verifyOTP(user).then(
      () => this.router.navigateByUrl('/home')
    ).catch(
      (err) => console.log("OTP Failure")
    );
  };
  
  freezeButton = () => {
    let freezeTime = 60;
    let timerId = setInterval(
      () => {
        this.lblCounter = ' ('+freezeTime+')'
        if(freezeTime==0) {
          this.lblCounter = '';
          this.isDisabledBtnSend = false;
          clearInterval(timerId);
        }
        freezeTime -=1;
      }, 1000
    );
  };

  updateCountryDial = (obj: any) => {
    console.log(obj);
  };
}
