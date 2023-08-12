import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments.prod';
import { MWBridge } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class MWBridgeService {

  private apiUrl = environment.apiUrl;
  private httpHeaders = new HttpHeaders()
    .set('Accept', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
    .set('content-type', 'application/json; charset=utf-8');
  constructor(public http: HttpClient) { }

  GetAuthorize(entity: MWBridge): Observable<any> {
    let getUrl = this.apiUrl + 'MWBridge/Private'
    return this.http.post<any>(getUrl, entity, { headers: this.httpHeaders, responseType: 'json' })
  }

  GetAuthorize(entity: MWBridge): Observable<any> {
    let getUrl = this.apiUrl + 'MWBridge/Public'
    return this.http.post<any>(getUrl, entity, { headers: this.httpHeaders, responseType: 'json' })
  }

  GetAuthorize(entity: MWBridge): Observable<any> {
    let getUrl = this.apiUrl + 'MWBridge/IsValidZainCashVerificationCode'
    return this.http.post<any>(getUrl, entity, { headers: this.httpHeaders, responseType: 'json' })
  }

}
