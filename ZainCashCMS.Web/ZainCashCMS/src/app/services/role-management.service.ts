import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { Result, User } from '../models/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleManagementService {

  
   private apiUrl = environment.apiUrl;
   private controllername="ApplicationRole";
 
   constructor(private http:HttpClient) {

   }
 
    public CreateRole(obj:any): Observable<any> 
    {
 
 return this.http.post<Result<any>>(this.apiUrl+this.controllername,obj);
 
    }
 
    public UpdateRole(obj:any)
    {
     return this.http.put<Result<any>>(this.apiUrl+this.controllername,obj);
 
    }
 
    public DeleteRole(obj:any)
    {
     console.log(true)
     return this.http.delete<Result<any>>(this.apiUrl+this.controllername+'/Delete/'+obj);
 
 
    }
    public GetAll()
    {
     return this.http.get<Result<any>>(this.apiUrl+this.controllername);
 
    }
    public GetbyId(obj:any)
    {
     return this.http.get(this.apiUrl+this.controllername+'/'+obj);
 
    }

    public GetAllWithPages()
    {
      let obj={
        "isSort": false,
        "sortFiled": "",
        "search": "",
        "searchField": "",
        "requestId": "",
        "pageSize":30
      }
      return this.http.post(this.apiUrl+'ApplicationClaim/GetAll',obj);

    }

    public updateWithClaims(obj:any)
    {
console.log(obj)
      return this.http.put(this.apiUrl+this.controllername+"/"+"UpdateClaims",obj);
    }
   

}
