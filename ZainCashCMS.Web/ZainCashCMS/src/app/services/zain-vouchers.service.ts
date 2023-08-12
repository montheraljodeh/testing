import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environments';
import { Result, ZainVouchers } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class ZainVouchersService {

  public apiurl = environment.apiUrl + "ZainVouchers";
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
    return this.http.post<Result<ZainVouchers>>(this.apiurl + "/" + "GetAll", search);
  }

  public GetSelection(): Observable<any> {
    return this.http.get<any>(this.apiurl + "/GetSelection", {})
  }


}
