import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DashboardService } from "../../services/dashboard.service";
import { map } from 'rxjs/operators';
import { environment } from './../../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Datsan } from '../../models/dashboard.model'
import { AuthService } from '../../../auth/services/auth.service';

@Component({
    selector: 'sb-get-list-san-by-token-innkeepe-and-idquan',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './get-list-san-by-token-innkeepe-and-idquan.component.html',
    styleUrls: ['get-list-san-by-token-innkeepe-and-idquan.component.scss'],
})
export class GetListSanByTokenInnkeepeAndIdquanComponent implements OnInit {
    constructor(
        private dashboardService: DashboardService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private ref: ChangeDetectorRef,
        private authService: AuthService,
    ) { }
    idquan = 1;
    listsanByidquan: any;
    quanByid$: any;
    quanByid: any;
    url = environment.url;
    mangDatsan = new Array();
    today = new Date().toISOString().slice(0, 10);
    ngayvagio: string = "";
    trackingObservable = false;
    ngOnInit() {
        this.idquan = Number(this.activatedRoute.snapshot.paramMap.get('idquan'));

        this.checkTokenInnkeeperAndIdquan(this.idquan);
    }
    checkTokenInnkeeperAndIdquan(idquan: number) {
        this.authService.checkTokenInnkeeperAndIdquan(idquan).subscribe(data => {
            console.log(data);

            if (!data.status) {
                this.router.navigate(['/dashboard/quans'])
            } else {
                this.getQuanByid(this.idquan);
                this.ngayvagio = new Date().toISOString().slice(0, 10);
                this.getSanByidquan(this.idquan, this.ngayvagio);
            }
        })
    }
    chonngay(ngay: any) {
        this.ngayvagio = ngay.target.value;
        console.log(ngay.target.value);
        this.getSanByidquan(this.idquan, ngay.target.value);

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

    getSanByidquan(idquan: number, ngay: any) {

        this.trackingObservable = false;

        this.dashboardService.getsanByidquan(idquan, ngay).subscribe(result => {
            if (result.status) {
                const arrMang = new Array();
                for (let i = 0; i < result.datsans.length; i++) {
                    arrMang[i] = this.mangdatsancuamotsan(result.datsans[i]);
                }
                this.mangDatsan = arrMang;
                this.listsanByidquan = result.san;
                this.trackingObservable = true;
                this.ref.detectChanges();
            }

        })
    }

    getQuanByid(id: number) {
        this.quanByid$ = this.dashboardService.getQuanById(id).pipe(map(result => this.quanByid = result.quan));
    }
    addSan(){
        this.router.navigate(['/dashboard/addSan/'+ this.idquan]);
    }
    xemdanhthu() {
        this.router.navigate(['dashboard/danhthu/' + this.idquan]);
    }    
    
}
