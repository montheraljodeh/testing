import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';
import { DigitalVoucherProviders, DigitalVoucherRegions, Result } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class DigitalVoucherProvidersService {

  public apiurl = environment.apiUrl + 'DigitalVoucherProviders';
  constructor(private http: HttpClient) { }

  public Create(entity: any): Observable<any> {
    return this.http.post(this.apiurl, entity, {});
  }

  public Update(entity: any):Observable<any> {

   return this.http.put(this.apiurl, entity, {});
  }

  public Delete(id: string) {
    return this.http.delete(this.apiurl + "/" + id);
  }

  public GetALL(search:any):Observable<any> {

    return this.http.post<Result<DigitalVoucherProviders>>(this.apiurl + "/" + "GetAll", search);
  }

  public GetDigitalVoucherProviderList(): Observable<any> {
    return this.http.get<Result<DigitalVoucherProviders>>(this.apiurl + "/" + "GetDigitalVoucherProviderList");
  }
}
