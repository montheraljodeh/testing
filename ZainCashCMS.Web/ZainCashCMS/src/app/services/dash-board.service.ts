import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class DashBoardService {

  public apiurl=environment.apiUrl+'DashBoard';
  constructor(private http:HttpClient) { }


public GetLoginPerDay():Observable<any>
{

return this.http.get(this.apiurl+"/"+"GetLoginPerDay");
}

public GetTicketPerDay():Observable<any>
{

return this.http.get(this.apiurl+"/"+"GetTicketPerDay");
}


public GetAllTotalDetails():Observable<any>
{

return this.http.get(this.apiurl+"/"+"GetAllTotalDetails");
}


}