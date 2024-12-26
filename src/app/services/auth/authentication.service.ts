import {Injectable} from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  isLoggedIn = false;

  constructor() {
  }

  setLoggedIn(_value:any) {
    this.isLoggedIn = _value;
  }

  isAuthenticated(): boolean {
    const user = localStorage.getItem('user')
    return !!user
  }
}
