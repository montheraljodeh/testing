import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { ChargeLimits, ChargeLimitsHistory, Result, SaveChargeLimitsHistoryDTO } from '../models/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChargeLimitsHistoryService {


  private apiUrl = environment.apiUrl + "ChargeLimitsHistory";

  constructor(private http: HttpClient) { }

  public GetALL(search: any): Observable<any> {

    return this.http.post<Result<any>>(this.apiUrl + "/" + "GetAll", search);
  }

  public SaveChargeLimitsHistory(requestObj: ChargeLimitsHistory, chargeObj: ChargeLimits, oldData: ChargeLimits, actionType: string) {
    const requestBody: SaveChargeLimitsHistoryDTO = {
      requestObj: requestObj,
      chargeObj: chargeObj,
      oldData: oldData,
      actionType: actionType
    };
    return this.http.post<Result<any>>(this.apiUrl + "/SaveChargeLimitsHistory", requestBody);
  }

  public GetVersions(search: any, requestId: string, hiddenValue: boolean): Observable<any> {
    const requestBody = {
      ls_Providers: search,
      RequestId: requestId,
      hiddenValue: hiddenValue
    };

    return this.http.post<Result<any>>(this.apiUrl + "/" + "GetVersions", requestBody);
  }

  public GetChargeLimitsByVersionNo(search: any, requestId: string, hiddenValue: boolean, id: any): Observable<any> {
    const requestBody = {
      ls_Providers: search,
      RequestId: requestId,
      hiddenValue: hiddenValue,
      id: id
    };

    return this.http.post<Result<any>>(this.apiUrl + "/" + "GetChargeLimitsByVersionNo", requestBody);
  }


}
