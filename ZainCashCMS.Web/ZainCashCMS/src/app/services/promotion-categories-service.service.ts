import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { PromotionCategories, Result } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class PromotionCategoriesServiceService {




  private apiUrl = environment.apiUrl;
  private controllername="PromotionCategories";

  constructor(private http:HttpClient) { }
public  GetAll(obj:any){


    return this.http.post<Result<PromotionCategories>>(this.apiUrl+this.controllername+"/GetAll",obj);
  }
  public Delete(id:string)
  {
    return this.http.delete(this.apiUrl+this.controllername+"/"+id);
  }
  public Create(obj:any)
  {
    
  return  this.http.post(this.apiUrl+this.controllername,obj);
  }

  public Update(obj:any)
  {
    return  this.http.put(this.apiUrl+this.controllername,obj);


  }
}
