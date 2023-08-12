import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { LocationTypes, Result } from '../models/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationTypesService {

  public apiurl = environment.apiUrl+'LocationTypes';
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

    return this.http.post<Result<LocationTypes>>(this.apiurl + "/" + "GetAll", search, {});
  }

  public GetLocationList(): Observable<any> {
    return this.http.get(this.apiurl + "/" + "GetLocationList");

  }

}
