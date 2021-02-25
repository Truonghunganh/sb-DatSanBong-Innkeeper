import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DashboardService } from "../../services/dashboard.service";
import { map } from 'rxjs/operators';
import { environment } from './../../../../environments/environment';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Thaydoidatsan } from '../../models/dashboard.model'
import { AuthService } from '../../../auth/services/auth.service';


@Component({
    selector: 'sb-thay-doi-dat-san-by-innkeeper',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './thay-doi-dat-san-by-innkeeper.component.html',
    styleUrls: ['thay-doi-dat-san-by-innkeeper.component.scss'],
})
export class ThayDoiDatSanByInnkeeperComponent implements OnInit {
    todayOld = new Date().toISOString().slice(0, 10);
    todayNew = new Date().toISOString().slice(0, 10);

    listdatsancuaquanOld: any;
    listdatsancuaquanNew: any;
    checkdatsansOld=false;
    checkdatsansNew=false;
    mangDatsanOld = new Array();
    mangDatsanNew = new Array();
    idsanOld = 0;
    idsanNew = 0;
    timeOld="";
    timeNew="";
    constructor(
        private dashboardService: DashboardService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private location: Location,
        private changeDetectorRef: ChangeDetectorRef,
        private authService: AuthService,
    ) { }
   ngOnInit() {
       this.checktoken();
   }
    checktoken() {
        this.authService.checkTokenInnkeeper().subscribe(data => {
            if (!data.status) {
                this.router.navigate(['/auth/login']);
            } else {
                this.getListDatSanByInnkeeperOld(this.todayOld);
                this.getListDatSanByInnkeeperNew(this.todayNew);
            }
        })
    }
    chonngayOld(ngay: any) {
        this.getListDatSanByInnkeeperOld(this.todayOld);

    }
    chonngayNew(ngay: any) {
        this.getListDatSanByInnkeeperNew(this.todayNew);
    }

    getListDatSanByInnkeeperOld(start_time: string){
        this.checkdatsansOld=false;
        this.dashboardService.getListDatSanByInnkeeper(start_time).subscribe(data=>{
            if(data.status){
                this.listdatsancuaquanOld=data.datsans;
                const arrMangOld = new Array();
                for (let i = 0; i < data.datsans.length; i++) {
                    const a = new Array();
                    for (let j = 0; j < data.datsans[i].datsans.length; j++) {
                        a[j] = this.mangdatsancuamotsan(data.datsans[i].datsans[j]);
                    }
                    arrMangOld[i] = a;
                }
                console.log(this.listdatsancuaquanOld);
                
                this.mangDatsanOld = arrMangOld;
                this.checkdatsansOld = true;
                this.changeDetectorRef.detectChanges();
            
            }            
        })
    }
    getListDatSanByInnkeeperNew(start_time: string) {
        this.checkdatsansNew = false;
        this.dashboardService.getListDatSanByInnkeeper(start_time).subscribe(data => {
            if (data.status) {
                this.listdatsancuaquanNew = data.datsans;
                const arrMangNew = new Array();
                for (let i = 0; i < data.datsans.length; i++) {
                    const a = new Array();
                    for (let j = 0; j < data.datsans[i].datsans.length; j++) {
                        a[j] = this.mangdatsancuamotsan(data.datsans[i].datsans[j]);
                    }
                    arrMangNew[i] = a;
                }
                this.mangDatsanNew = arrMangNew;
                this.checkdatsansNew = true;
                this.changeDetectorRef.detectChanges();

            }
        })
    }

    Cancel(){

    }
    Save(){
        Swal.fire({
            html: '<h1 style="color: #41c04d;">Do you want to save the changes?</h1><h4> idsanOld=' + this.idsanOld + '------->idsanNew=' + this.idsanNew + '</h4><h4> timeOld=' + this.timeOld + '------->timeNew=' + this.timeNew + '</h4>',
            showCancelButton: true,
            confirmButtonText: 'Save',
        }).then((result) => {
            if (result.isConfirmed) {
                const thaydoidatsan=new Thaydoidatsan(this.idsanOld,this.idsanNew,this.timeOld,this.timeNew);
                this.dashboardService.thayDoiDatSanByInnkeeper(thaydoidatsan).subscribe(data => {
                    console.log(data);

                    if (data.status) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Your work has been saved',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        this.getListDatSanByInnkeeperOld(this.todayOld);
                        this.getListDatSanByInnkeeperNew(this.todayNew);
                        
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: data.message,
                        })

                    }
                })


            }
        })

    }
    mangdatsancuamotsan(san: any) {
        let array = new Array(false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false);
        for (let i = 0; i < san.length; i++) {
            switch (san[i].start_time.slice(11, 13)) {
                case "05": array[0] = true; break;
                case "06": array[1] = true; break;
                case "07": array[2] = true; break;
                case "08": array[3] = true; break;
                case "09": array[4] = true; break;
                case "10": array[5] = true; break;
                case "11": array[6] = true; break;
                case "12": array[7] = true; break;
                case "13": array[8] = true; break;
                case "14": array[9] = true; break;
                case "15": array[10] = true; break;
                case "16": array[11] = true; break;
                case "17": array[12] = true; break;
                case "18": array[13] = true; break;
                case "19": array[14] = true; break;
                case "20": array[15] = true; break;

                default:
                    break;
            }
        }
        return array;
    }
    chondatsanOld(gio: number, idsan: number) {
        this.idsanOld=idsan;
        switch (gio) {
            case 0:
                this.timeOld =this.todayOld  + " 05:00:00";
                break;
            case 1:
                this.timeOld = this.todayOld + " 06:00:00";
                break;
            case 2:
                this.timeOld = this.todayOld + " 07:00:00";
                break;
            case 3:
                this.timeOld = this.todayOld + " 08:00:00";
                break;
            case 4:
                this.timeOld = this.todayOld + " 09:00:00";
                break;
            case 5:
                this.timeOld = this.todayOld + " 10:00:00";
                break;
            case 6:
                this.timeOld = this.todayOld + " 11:00:00";
                break;
            case 7:
                this.timeOld = this.todayOld + " 12:00:00";
                break;

            case 8:
                this.timeOld = this.todayOld + " 13:00:00";
                break;
            case 9:
                this.timeOld = this.todayOld + " 14:00:00";
                break;
            case 10:
                this.timeOld = this.todayOld + " 15:00:00";
                break;
            case 11:
                this.timeOld = this.todayOld + " 16:00:00";
                break;

            case 12:
                this.timeOld = this.todayOld + " 17:00:00";
                break;
            case 13:
                this.timeOld = this.todayOld + " 18:00:00";
                break;
            case 14:
                this.timeOld = this.todayOld + " 19:00:00";
                break;
            case 15:
                this.timeOld = this.todayOld + " 20:00:00";
                break;


            default:
                break;
        }
    }

    chondatsanNew(gio: number, idsan: number) {
        this.idsanNew = idsan;
        switch (gio) {
            case 0:
                this.timeNew = this.todayNew + " 05:00:00";
                break;
            case 1:
                this.timeNew = this.todayNew + " 06:00:00";
                break;
            case 2:
                this.timeNew = this.todayNew + " 07:00:00";
                break;
            case 3:
                this.timeNew = this.todayNew + " 08:00:00";
                break;
            case 4:
                this.timeNew = this.todayNew + " 09:00:00";
                break;
            case 5:
                this.timeNew = this.todayNew + " 10:00:00";
                break;
            case 6:
                this.timeNew = this.todayNew + " 11:00:00";
                break;
            case 7:
                this.timeNew = this.todayNew + " 12:00:00";
                break;

            case 8:
                this.timeNew = this.todayNew + " 13:00:00";
                break;
            case 9:
                this.timeNew = this.todayNew + " 14:00:00";
                break;
            case 10:
                this.timeNew = this.todayNew + " 15:00:00";
                break;
            case 11:
                this.timeNew = this.todayNew + " 16:00:00";
                break;

            case 12:
                this.timeNew = this.todayNew + " 17:00:00";
                break;
            case 13:
                this.timeNew = this.todayNew + " 18:00:00";
                break;
            case 14:
                this.timeNew = this.todayNew + " 19:00:00";
                break;
            case 15:
                this.timeNew = this.todayNew + " 20:00:00";
                break;


            default:
                break;
        }
    }
}
