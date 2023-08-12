import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { TokenHandlerServiceService } from './token-handler-service.service';
import { tap, Observable, from, switchMap, map } from 'rxjs';
import * as forge from 'node-forge';
import * as CryptoJS from 'crypto-js';


@Injectable({
providedIn: 'root'
}) 
export class HttpConfigInterceptorService implements HttpInterceptor {
token: any;
headerConfig: any = {};
secertKey:any= CryptoJS.enc.Utf8.parse('E546C8DF278CD5931069B522E695D4F2');
private iv = CryptoJS.enc.Hex.parse('00000000000000000000000000000000'); 

constructor(public http: HttpClient, private auths: AuthenticationService, private tokenhandler: TokenHandlerServiceService) { }

intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
const body = request.body;

this.token = this.auths.getToken('token')


if (request.body instanceof FormData) {
this.headerConfig = {
'enctype': 'multipart/form-data',
};

} else {
this.headerConfig = {
'Content-Type': 'application/json ',
'Accept': 'application/json'
};
}
const encrypted = CryptoJS.AES.encrypt(JSON.stringify( body), this.secertKey, {
iv: this.iv,
mode: CryptoJS.mode.CBC,
padding: CryptoJS.pad.Pkcs7
});
const encryptrequest = request.clone({
body: { data: encrypted.toString()},
});
return next.handle(encryptrequest);

}

}