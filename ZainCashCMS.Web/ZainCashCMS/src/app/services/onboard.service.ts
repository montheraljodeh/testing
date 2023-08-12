import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';
import { OnBoard, Result } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class OnboardService {

  public apiurl = environment.apiUrl+'OnBoard';
  constructor(private http: HttpClient) { }

  public Create(entity:any):Observable<any> {
    return this.http.post<Result<any>>(this.apiurl,entity, {});
  }

  public Update(entity: any):Observable<any> {

    return this.http.put<Result<any>>(this.apiurl, entity,{});
  }

  public Delete(id: string) {
    return this.http.delete(this.apiurl+ "/" + id);
  }

  public GetALL(search: any): Observable<any> {

    return this.http.post<Result<OnBoard>>(this.apiurl + "/" + "GetAll", search, {});
  }

}