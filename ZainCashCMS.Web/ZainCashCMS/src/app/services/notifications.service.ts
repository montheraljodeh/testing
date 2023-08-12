import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { Notifications } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  public apiurl = environment.apiUrl+"Notifications";
  constructor(private http: HttpClient) { }


  public SendNotifications(entity: Notifications) {
   

    return this.http.post(this.apiurl + "/" + "SendNotifications", entity, {});
  }


}
