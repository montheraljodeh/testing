import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environments';
import { Observable, throwError } from 'rxjs';
import { Result, UserLogin } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class ApplicationUsersService {

  private apiUrl = environment.apiUrl;
  private httpHeaders = new HttpHeaders()
    .set('Accept', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
    .set('content-type', 'application/json; charset=utf-8');
  constructor(public http: HttpClient) { }


  GetAuthorize(entity: UserLogin): Observable<any> {
    let getUrl = this.apiUrl + 'ApplicationUser/Authentication'
    return this.http.post<any>(getUrl, entity, { headers: this.httpHeaders, responseType: 'json' })
  }



}
