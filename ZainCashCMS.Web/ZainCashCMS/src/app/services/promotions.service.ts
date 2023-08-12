import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { Promotions, Result } from '../models/models';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class PromotionsService {

  public apiurl = environment.apiUrl + "Promotions";
  constructor(private http: HttpClient) { }

  public Create(entity: Promotions) {
    return this.http.post(this.apiurl, entity, {});
  }

  public Update(entity: any) {

    return this.http.put(this.apiurl, entity, {});
  }

  public Delete(id: string) {
    return this.http.delete(this.apiurl + "/" + id);
  }

  public GetALL(search: any): Observable<any> {
    return this.http.post<Result<Promotions>>(this.apiurl + "/" + "GetAll", search);
  }

  public GetSelection(): Observable<any> {
    return this.http.get<any>(this.apiurl + "/GetSelection", {})
  }


}
