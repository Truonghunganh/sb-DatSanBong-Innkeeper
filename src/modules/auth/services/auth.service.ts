import { HttpClient} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import {  Observable, of,  } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { environment } from './../../../environments/environment';
import { AppCommonService } from './../../app-common/services/app-common.service';
import { User } from './../models/auth.model';

@Injectable()
export class AuthService {
    constructor(
        private http: HttpClient,
        private appCommonService: AppCommonService,
        @Inject(LOCAL_STORAGE) private storage: WebStorageService,
        private router: Router
    ) {
    }
    logout() {
        this.storage.set('tokenInnkeeper', JSON.stringify(1));
        this.router.navigate(['auth/login']);

    }
    checkTokenInnkeeper(): Observable<any>{
        return this.http.get<any>(environment.url +'/api/v1/checkTokenInnkeeper', this.appCommonService.httpOptions).pipe(
            tap(data => {
                of(data);
            }),
            catchError(this.appCommonService.errorHandler)
        )
    }
    login(user : User): Observable<any>{
        return this.http.post<any>(environment.url+'/api/v1/loginInnkeeper', user, this.appCommonService.httpOptions).pipe(
            tap(data=>{
                console.log(data);
                if(data.status){                    
                    this.storage.set('tokenInnkeeper', JSON.stringify(data.token));                    
                }
                return of(data);
            }),
            catchError(this.appCommonService.errorHandler)
        )
    }    
    setToken(token:string){
        this.storage.set('tokenInnkeeper', JSON.stringify(token));
    }
    checkTokenInnkeeperAndIdquan(idquan:number): Observable<any> {
        return this.http.post<any>(environment.url + '/api/v1/checkTokenInnkeeperAndIdquan', {idquan:idquan}, this.appCommonService.httpOptions).pipe(
            tap(data => {
                of(data);
            }),
            catchError(this.appCommonService.errorHandler)
        )
    }

    checkTokenInnkeeperAndIdsan(idsan: number): Observable<any> {
        return this.http.post<any>(environment.url + '/api/v1/checkTokenInnkeeperAndIdsan', { idsan: idsan }, this.appCommonService.httpOptions).pipe(
            tap(data => {
                of(data);
            }),
            catchError(this.appCommonService.errorHandler)
        )
    }

}
