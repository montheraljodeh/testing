import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';
import { DigitalVouchers, Result } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class DigitalVouchersService {

  public apiurl = environment.apiUrl + 'DigitalVouchers';
  constructor(private http: HttpClient) { }

  public Create(entity: any):Observable<any> {
    return this.http.post(this.apiurl, entity, {});
  }

  public Update(entity: any):Observable<any> {

    return this.http.put(this.apiurl, entity, {});
  }

  public Delete(id: string) {
    return this.http.delete(this.apiurl + "/" + id);
  }

  public GetALL(search: any):Observable<any> {

    return this.http.post<Result<DigitalVouchers>>(this.apiurl + "/" + "GetAll", search);
  }

}
