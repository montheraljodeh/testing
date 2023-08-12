import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';
import { Billers, Categories, Result } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class BillersService {

  public apiurl = environment.apiUrl + 'Billers';
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
    return this.http.post<Result<Billers>>(this.apiurl + "/" + "GetAll", search);
  }

  public GetBillersList(): Observable<any> {
    return this.http.get<Result<Billers>>(this.apiurl + "/" + "GetBillersList");

  }


}
