import {Injectable} from '@angular/core';

import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot,Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {AuthService} from './services/auth.service'
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):boolean{
    let active = this.auth.loginState()
    if(!active){
      this.router.navigate(['/'])
    }
    return active;
  }
}
