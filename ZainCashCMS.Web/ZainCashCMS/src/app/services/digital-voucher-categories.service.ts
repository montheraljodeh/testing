import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';
import { DigitalVoucherCategories, Result } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class DigitalVoucherCategoriesService {

  public apiurl = environment.apiUrl + 'DigitalVoucherCategories';
  constructor(private http: HttpClient) { }

  public Create(entity: any) {
    return this.http.post(this.apiurl, entity, {});
  }

  public Update(entity: any) {

    return this.http.put(this.apiurl, entity, {});
  }

  public Delete() {
    return this.http.delete(this.apiurl + "/lorem");
  }

  public GetALL(search: any): Observable<any> {

    return this.http.post<Result<DigitalVoucherCategories>>(this.apiurl + "/" + "GetAll", search);
  }

  public GetDigitalVoucherCategoriesList(): Observable<any> {
    return this.http.get<Result<DigitalVoucherCategories>>(this.apiurl + "/" + "GetDigitalVoucherCategoriesList");

  }
}
