import { Injectable } from '@angular/core';
import { Shared } from '../Shared/dynamictable/Shared.interface';
import { HttpClient } from '@angular/common/http';
import { AppVersions, Result } from '../models/models';
import { environment } from 'src/environments/environments';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppVersionsService  {
  private apiUrl = environment.apiUrl;
  private controllername="AppVersions";

  constructor(private http:HttpClient) { }
public  GetAll(obj:any){


    return this.http.post<Result<AppVersions>>(this.apiUrl+this.controllername+"/GetAll",obj);
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



