import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environments';
import { Result, ServiceOptions } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class ServiceOptionsService {
  public apiurl = environment.apiUrl + "ServiceOptions";
  constructor(private http: HttpClient) { }

  public Create(entity: ServiceOptions) {
    return this.http.post(this.apiurl, entity, {});
  }

  public Update(entity: any) {

    return this.http.put(this.apiurl, entity, {});
  }

  public Delete(id: string) {
    return this.http.delete(this.apiurl + "/" + id);
  }

  public GetALL(search: any): Observable<any> {
    return this.http.post<Result<ServiceOptions>>(this.apiurl + "/" + "GetAll", search);
  }

  public GetSelection(): Observable<any> {
    return this.http.get<any>(this.apiurl + "/GetSelection", {})
  }



}
