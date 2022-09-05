import { Injectable } from '@angular/core';
import { Amplify } from 'aws-amplify';
import { Auth, CognitoUser } from '@aws-amplify/auth'
import aws_exports from '../../../aws-exports';
import { BehaviorSubject } from 'rxjs';

export interface IUser {
  username: string,
  password: string,
  otp: string
}

@Injectable({providedIn: 'root'})
export class AuthService {
  private authenticationSubject: BehaviorSubject<any>;
  cognitoUser: CognitoUser | undefined;
  constructor() {
    Amplify.configure(aws_exports);
    this.authenticationSubject = new BehaviorSubject<boolean>(false);
  }
  
  signIn = (user: IUser): Promise<any> => {
    return Auth.signIn(user.username).then(
      (user) => {
        this.cognitoUser = user;
        this.authenticationSubject.next(true);
      }
    ).catch(
      (err) => {
        if(err.code === 'UserNotFoundException') {
          this.signUp(user);
        }else if (err.code === 'UsernameExistsException') {
          console.log("error: username exists", err);
        } else {
          console.log(err.code, err);
        }
      }
    );
  };

  signUp = async (user: IUser): Promise<any> => {
    user.password = 'password';
    const result = await Auth.signUp({
      username: user.username,
      password: user.password,
      attributes: {
        phone_number: user.username
      }
    }).then(
      () => this.signIn(user)
    );
    return result;
  };

  verifyOTP = async (user: IUser): Promise<any> => {
    const result = await Auth.sendCustomChallengeAnswer(this.cognitoUser, user.otp).then(
      () => {
        this.authenticationSubject.next(true);
      }
    ).catch(
      (err) => {
        console.log(err.code, err)
      }
    );
    return result;
  };

  verifyUser = (): Promise<any> => {
    return Auth.currentAuthenticatedUser().then(
      () => true
    ).catch(
      () => false
    );
  };
}
