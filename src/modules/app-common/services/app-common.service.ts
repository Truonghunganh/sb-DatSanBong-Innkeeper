import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { environment } from 'environments/environment';
import { Observable, of, throwError } from 'rxjs';

@Injectable()
export class AppCommonService {
    constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService) {}
    getToken(){
        if(this.storage.get('tokenInnkeeper')){
            return this.storage.get('tokenInnkeeper');
        }
        else{
            return "1";
        }
    }
    public httpOptions = {
        headers: new HttpHeaders({
            'tokenInnkeeper': JSON.parse(this.getToken()),
            //'Access-Control-Allow-Credentials': 'true',
            //'Access-Control-Allow-Origin': '*',
            //'Content-Type': 'multipart/form-data;boundary=----WebKitFormBoundaryyrV7KO0BoCBuDbTL',
          //  'Content-Type':'application/json'

        }),
    };
    public httpOptions1 = {
        headers: new HttpHeaders({
            'Content-Type': 'multipart/form-data', 'Cache-Control': 'no-cache', 'Pragma': 'no-cache'
        })
    };
    errorHandler(error: HttpErrorResponse) {
        return throwError(error.message || 'Serve error');
    }
}
