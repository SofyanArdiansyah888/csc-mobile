import {Injectable} from '@angular/core';
import {CanActivate, Router, UrlTree} from '@angular/router';
import {AuthenticationService} from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private auth: AuthenticationService,
              private router: Router
  ) {
  }

  async canActivate(): Promise<boolean | UrlTree> {
    // tslint:disable-next-line:prefer-const
    const value = this.auth.isAuthenticated();
    if (!value) {
      return await this.router.navigateByUrl('/login');
    }
    return value;
  }
}
