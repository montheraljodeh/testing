import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { Result, TermsAndConditions } from '../models/models';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class TermsAndConditionsService {
  public apiurl = environment.apiUrl + "TermsAndConditions";
  constructor(private http: HttpClient) { }

  public Create(entity: any) {
    return this.http.post(this.apiurl, entity, {});
  }

  public Update(entity: any) {

    return this.http.put(this.apiurl, entity, {});
  }

  public Delete(id: string) {
    return this.http.delete(this.apiurl + "/" + id);
  }

  public GetALL(search: any): Observable<any> {
    return this.http.post<Result<TermsAndConditions>>(this.apiurl + "/" + "GetAll", search);
  }


}
