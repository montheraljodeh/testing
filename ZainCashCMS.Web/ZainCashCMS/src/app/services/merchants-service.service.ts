import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class MerchantsServiceService {
  public apiurl=environment.apiUrl;
  public apiName='Merchants';
  constructor(private http:HttpClient) { }

  public Create()
{
  return this.http.post(this.apiurl+this.apiName,{});
}

public Update()
{

  this.http.put(this.apiurl+this.apiName,{});
}

public Delete()
{
  return this.http.delete(this.apiurl+this.apiName+"/lorem");
}

public GetALL()
{
  let obj= {
    "isSort": true,
    "sortFiled": "string",
    "search": "string",
    "searchField": "string",
    "requestId": "string"
  };

return   this.http.post(this.apiurl+"/"+"GetAll",obj);
}
public GetById()
{
  return this.http.get(this.apiurl+"GetById/"+"23223232");
}

}
