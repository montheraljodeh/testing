import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { GetParticipants, Result } from '../models/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetParticipantsService {
  public apiurl = environment.apiUrl + "GetParticipants";
  constructor(private http: HttpClient) { }

  public Create(entity: GetParticipants) {
    return this.http.post(this.apiurl, entity, {});
  }

  public Update(entity: any) {

    return this.http.put(this.apiurl, entity, {});
  }

  public Delete(id: string) {
    return this.http.delete(this.apiurl + "/" + id);
  }

  public GetALL(search: any): Observable<any> {
    return this.http.post<Result<GetParticipants>>(this.apiurl + "/" + "GetAll", search);
  }

}
