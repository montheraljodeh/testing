import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ApplicationClaimService {
  public apiurl = environment.apiUrl + 'ApplicationClaim';

  constructor(private http: HttpClient) { }

  public GetALL(searchModel: any): Observable<any> {

    return this.http.post(this.apiurl + "/" + "GetAll", searchModel);
  }
}
