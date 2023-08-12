import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { Banners, Result, SearchModel } from '../models/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BannersService {

  public apiurl=environment.apiUrl+'Banners';
  constructor(private http:HttpClient) { }

  public Post(entity:Banners) 
{
  let criteriaParams = new HttpParams();
  // Object.keys(entity).forEach(key => {
  
  //   if (key == "") {
  //     if (entity.selectorBannerShownIns) {
  //       entity.selectorBannerShownIns.forEach(x => {
  //         criteriaParams = criteriaParams.append(key, x.toString());
  //       })
  //     }}else{
  //       criteriaParams = criteriaParams.append(key, entity.toString());

  //     }

  // });

  entity.categoryRQid = "637836417131746138";
  return this.http.post<Result<Banners>>(this.apiurl,entity,{});
}

public Update(entity:Banners)
{
  entity.categoryRQid = "637836417131746138";

  return  this.http.put(this.apiurl,entity,{});
}

public Delete(id:string)
{
  return this.http.delete(this.apiurl+"/"+id);
}

public GetALL(searchModel:any):Observable<any>
{

return   this.http.post(this.apiurl+"/"+"GetAll",searchModel);
}
public GetById(id:string)
{
  return this.http.get(this.apiurl+"GetById/"+id);
}

}
