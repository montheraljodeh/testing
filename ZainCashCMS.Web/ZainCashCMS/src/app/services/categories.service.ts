import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { Categories, Result, SearchModel } from '../models/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  public apiurl = environment.apiUrl + 'Categories';
  constructor(private http: HttpClient) { }

  public Create() {
    return this.http.post(this.apiurl, {});
  }

  public Update(entity: any): Observable<any> {

    return this.http.put(this.apiurl, entity, {});
  }

  public Delete(id: String) {
    return this.http.delete(this.apiurl + "/" + id);
  }

  public GetALL(searchModel: any): Observable<any> {

    return this.http.post<Result<Categories>>(this.apiurl + "/" + "GetAll", searchModel);
  }

  public GetCategoryList(): Observable<any> {
    return this.http.get<Result<Categories>>(this.apiurl + "/" + "GetCategoryList");

  }
}
