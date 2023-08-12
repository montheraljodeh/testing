import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { environment } from 'src/environments/environments';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class TokenHandlerServiceService {

  private apiUrl = environment.apiUrl + 'api/';
  private httpHeaders = new HttpHeaders()
    .set("Accept", "application/json")
    .set("Access-Control-Allow-Origin", "*")
    .set("content-type", "application/json; charset=utf-8");

  constructor(public auth: AuthenticationService,
    private http: HttpClient,
    private router: Router) { }

  isTokenExpired(): boolean {
    let token: any = this.auth.getToken('token');
    if (token != "") {
      //decode Jwt Token Decode
      const decoded = jwt_decode(token);
      const appDate = this.getTokenExpirationDate(token);
     if(appDate.valueOf() > new Date().valueOf()){
         return true; 
     }else{
      return false;
     }
    }else{
      return false;
    }

  }


  getTokenExpirationDate(token: string): Date {
    const decoded: any = jwt_decode(token);
    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }



}
