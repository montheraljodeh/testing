import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';
import { Result } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class ChargeLimitsService {

  public apiurl = environment.apiUrl + 'ChargeLimits';
  constructor(private http: HttpClient) { }

  public Create(entity: any): Observable<any> {
    return this.http.post(this.apiurl, entity, {});
  }

  public Update(entity: any): Observable<any> {

    return this.http.put(this.apiurl, entity, {});
  }

  public Delete(id: string) {
    return this.http.delete(this.apiurl + "/" + id);
  }

  public GetALL(search: any): Observable<any> {

    return this.http.post<Result<any>>(this.apiurl + "/" + "GetAll", search);
  }
  
   public  GetById(id: string):Observable<any> {
    return  this.http.get<any>(this.apiurl +"/"+ id);
  }

}
