import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AppCommonService } from '@common/services';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from "../../../environments/environment";
import { Innkeeper } from '../models/dashboard.model'; 
import { AuthService  } from '../../auth/services/auth.service'
import { Quan } from "../models/dashboard.model";
import { San,San1 } from "../models/dashboard.model";

@Injectable()
export class DashboardService {
    constructor(
        private http: HttpClient, 
        private appCommonService: AppCommonService,
        private authService: AuthService
        ) {}
    
    
    getListQuansByTokenInnkeeper(): Observable<any>{
        return this.http
            .get<any>(environment.url + "/api/v1/getListQuansByTokenInnkeeper",this.appCommonService.httpOptions)
            .pipe(
                tap(data => {
                    of(data);
                },
                    catchError(this.appCommonService.errorHandler)
                ));
    }
    
    editInnkeeperByToken(innkeeper: Innkeeper): Observable<any>{
        return this.http.put<any>(environment.url + "/api/v1/editInnkeeperByToken",innkeeper,this.appCommonService.httpOptions).pipe(
            tap(data => { 
                console.log(data);
                if (data.status) {
                    this.authService.setToken(data.token);                    
                }
                
                of(data)} )
            ,catchError(this.appCommonService.errorHandler)
        )
    }

    addQuanByInnkeeper(formData:FormData): Observable<any>{
        return this.http.post<any>(environment.url +"/api/v1/addQuanByInnkeeper",formData,this.appCommonService.httpOptions)
            .pipe(
                tap(data => of(data)),
                catchError(this.appCommonService.errorHandler)
            )
    }
    
    getListQuansByTokenInnkeeperChuaPheDuyet(): Observable<any>{
        return this.http.get<any>(environment.url + "/api/v1/getListQuansByTokenInnkeeperChuaPheDuyet",this.appCommonService.httpOptions).pipe(
            tap(data => of(data)),catchError(this.appCommonService.errorHandler)
        )
    }
    
    getQuanByInnkeeper(id: number):Observable<any>{        return this.http.get<any>(environment.url +"/api/v1/quan/"+id,this.appCommonService.httpOptions).pipe(
            tap(data => of(data)), catchError(this.appCommonService.errorHandler)
        )
    }
    
    editQuanByTokenInnkeeper(formData: FormData): Observable<any> {
        return this.http.post<any>(environment.url + "/api/v1/editQuanByTokenInnkeeper",formData,this.appCommonService.httpOptions).pipe(
            tap(data=>of(data)), catchError(this.appCommonService.errorHandler)
        );
    }
    
    getsanByidquan(idquan: number, ngay: any): Observable<any> {
        return this.http.get<any>(environment.url + "/api/v1/san?idquan=" + idquan + "&start_time=" + ngay)
            .pipe(
                tap(data => {
                    of(data);
                },
                catchError(this.appCommonService.errorHandler)
        ));
    }

    getQuanById(id: number): Observable<any> {
        return this.http.get<any>(environment.url + "/api/v1/quan/" + id,this.appCommonService.httpOptions)
            .pipe(tap(data => of(data)), catchError(this.appCommonService.errorHandler));
    }
    addSanByInnkeeper(san:San): Observable<any> {
        return this.http.post<any>(environment.url + "/api/v1/addSanByInnkeeper",san,this.appCommonService.httpOptions)
            .pipe(tap(data => of(data)), catchError(this.appCommonService.errorHandler));
    }
    deleteQuanChuaduyetByInnkeeper(idquan:number): Observable<any> {
        return this.http.delete<any>(environment.url + "/api/v1/deleteQuanChuaduyetByInnkeeper?idquan="+ idquan, this.appCommonService.httpOptions)
            .pipe(tap(data => of(data)), catchError(this.appCommonService.errorHandler));
    }
    
    getSanByid(id: number) : Observable<any>{
        return this.http.get<any>(environment.url + "/api/v1/san/" + id, this.appCommonService.httpOptions)
            .pipe(tap(data => of(data)), catchError(this.appCommonService.errorHandler));
    } 
    
    editSanByInnkeeper(san: San1): Observable<any> {
        return this.http.put<any>(environment.url + "/api/v1/editSanByInnkeeper", san, this.appCommonService.httpOptions)
            .pipe(tap(data => of(data)), catchError(this.appCommonService.errorHandler));
    }


}
