import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';
import { DigitalVoucherRegions, Result } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class DigitalVoucherRegionsService {

  public apiurl = environment.apiUrl + 'DigitalVoucherRegions';
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
    return this.http.post<Result<DigitalVoucherRegions>>(this.apiurl + "/" + "GetAll", search);
  }

  public GetDigitalVoucherRegionsList(): Observable<any> {
    return this.http.get<Result<DigitalVoucherRegions>>(this.apiurl + "/" + "GetDigitalVoucherRegionsList");
  }
}
