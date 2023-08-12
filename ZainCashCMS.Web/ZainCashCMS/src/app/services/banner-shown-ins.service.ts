import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { Observable, throwError } from 'rxjs';
import { BannerShownIns, Result, SearchModel } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class BannerShownInsService {

  public apiurl = environment.apiUrl + "BannerShownIns";
  constructor(private http: HttpClient) { }

  public Create(entity: BannerShownIns) {
    return this.http.post(this.apiurl, entity, {});
  }

  public Update(entity: any) {

    return this.http.put(this.apiurl, entity, {});
  }

  public Delete(id: string) {
    return this.http.delete(this.apiurl + "/" + id);
  }

  public GetALL(search: any): Observable<any> {
    return this.http.post<Result<BannerShownIns>>(this.apiurl + "/" + "GetAll", search);
  }

  public GetSelection(): Observable<any> {
    return this.http.get<any>(this.apiurl + "/GetSelection", {})
  }


}
