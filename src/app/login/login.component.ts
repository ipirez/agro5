import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  test: string = 'just a test';

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {

  }
adminPath(){
  this.auth.toggleState()
  this.router.navigate(['/dashboard'])
}
}
