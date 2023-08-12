import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApplicationlocalStorage } from '../models/models';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  setToken(token: any) {
    window.localStorage['token'] = token;
  }

  getToken(item: string): string {
    if (localStorage.getItem(item)) {
      var result = localStorage.getItem(item);
      return result != null ? result : "";
    }
    else {
      return "";
    }
  }

  destroyToken() {
    window.localStorage.removeItem('token');
  }

  logout(hasNavigation = false) {
    this.destroyToken();
    localStorage.clear();
  }

  getLoggedInUser(): ApplicationlocalStorage {
    let obj = new ApplicationlocalStorage();
    var token = localStorage.getItem('token')
    if (token)
      var tokenVal: any = jwt_decode(token)
    obj.roleName = tokenVal != null ? tokenVal.Role : "";

    return obj;

  }

}
