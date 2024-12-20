import {Injectable} from '@angular/core';
import {CanActivate, Router, UrlTree} from '@angular/router';
import {LoginPage} from 'src/app/pages/auth/login/login.page';
import {ModalService} from '../ionic/modal.service';
import {AuthenticationService} from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private auth: AuthenticationService, private router: Router, private modalService: ModalService) { }

  canActivate(): boolean | UrlTree {
    // tslint:disable-next-line:prefer-const
    const value = this.auth.isAuthenticated();
    // console.log(value)
    if (!value) {
      // return this.router.parseUrl('/login');
      //  this.modalService.show(LoginPage);
    }
    return value;
  }
}
