import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { Observable } from 'rxjs';
import { Result, User } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class UserManagementServiceService {


  private apiUrl = environment.apiUrl;
  private controllername = "ApplicationUser";

  constructor(public http: HttpClient) {
  }


  public CreateUser(obj: User) {

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');

    let formData: FormData = new FormData();
    let files = obj.file;
    if (files != null || files != undefined) {
      if (files.length > 0) {
        Array.from(files).forEach(file => {
          formData.append("file", file, file.name);
        });
      }
    }

    formData.append("fullName", obj.fullName!);
    formData.append("userName", obj.userName!);
    formData.append("password", obj.password!);
    formData.append("language", obj.language!.toString());
    formData.append("userEmail", obj.userEmail!);
    formData.append("phoneNumber", obj.phoneNumber!);
    formData.append("roleName", obj.roleName!);
    formData.append("aboutDescription", obj.aboutDescription!);
    formData.append("mainimage", obj.mainimage!);
    console.log(formData.getAll('userName'))
    let objofuser = {
      fullName: obj.fullName,
      userName: obj.userName,
      password: obj.password,
      language: obj.language,
      userEmail: obj.userEmail,
      phoneNumber: obj.phoneNumber,
      roleName: obj.roleName,
      aboutDescription: obj.aboutDescription,
      mainImage: obj.mainimage
    }
    return this.http.post<Result<User>>(this.apiUrl + this.controllername, objofuser, { headers: headers, responseType: 'json' });

  }

  public UpdateUser(obj: any) {
    return this.http.put<Result<User>>(this.apiUrl + this.controllername, obj);

  }

  public DeleteUser(obj: any) {
    console.log(true)
    return this.http.delete<Result<User>>(this.apiUrl + this.controllername + '/Delete/' + obj);


  }
  public GetAll() {
    return this.http.get<any>(this.apiUrl + this.controllername);

  }
  public GetbyId(obj: any) {
    return this.http.get(this.apiUrl + this.controllername + '/' + obj);

  }
  public GetRoleBasedOnClaims(roleName: string) {

    return this.http.get(this.apiUrl + this.controllername + '/' + "GetRoleBasedonClaims" + '/' + roleName);
  }

  public UpdateClaimsByUser(obj: any) {

    return this.http.post(this.apiUrl + this.controllername + '/' + 'UpdateClaimsByUser', obj);
  }



}

