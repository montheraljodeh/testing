import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class UpdateKycServiceService {
  public apiurl=environment.apiUrl;
  public apiName='UpdateKyc';
  constructor(private http:HttpClient) { }


  public GetById()
  {
    return this.http.get(this.apiurl+"GetById/"+"23223232");
  }

}
