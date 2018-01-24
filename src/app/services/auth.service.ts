import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  private userState;
  public username;
  constructor() {
    this.userState = true;
  }
  toggleState(){
    this.userState = this.userState ? false : true;
    this.username = 'admin'
  }
  loginState(){
    return this.userState;
  }
}
