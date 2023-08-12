import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';
import { BillerServices, Result } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class BillerServicesService {

  public apiurl = environment.apiUrl + 'BillerServices';
  constructor(private http: HttpClient) { }

  public Create(entity: any) {
    return this.http.post(this.apiurl, entity,{});
  }

  public Update(entity: any) {

    return this.http.put(this.apiurl, entity,{});
  }

  public Delete(id: string) {
    return this.http.delete(this.apiurl + "/" + id);
  }

  public GetALL(searchModel: any): Observable<any> {

    return this.http.post<Result<BillerServices>>(this.apiurl + "/" + "GetAll", searchModel);
  }

  public GetSelection(): Observable<any> {
    return this.http.get<any>(this.apiurl + "/GetBillerServiceList", {})
  }

}
