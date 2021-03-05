import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DashboardService } from "../../services/dashboard.service";
import { map } from 'rxjs/operators';
import { environment } from './../../../../environments/environment';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Datsan } from '../../models/dashboard.model'
import { AuthService } from '../../../auth/services/auth.service';


@Component({
    selector: 'sb-thong-tin-dat-sans',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './thong-tin-dat-sans.component.html',
    styleUrls: ['thong-tin-dat-sans.component.scss'],
})
export class ThongTinDatSansComponent implements OnInit {
    trangthai=true;
    time = new Date().toISOString().slice(0, 10);
    idquan=0;
    datsans: any;
    checkdatsans=false;


    constructor(
        private dashboardService: DashboardService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private changeDetectorRef: ChangeDetectorRef,
        private authService: AuthService,
    ) { }
    ngOnInit() {
        this.time = new Date().toISOString().slice(0, 10)+" 00:00:00";
        this.idquan= Number(this.activatedRoute.snapshot.paramMap.get('idquan'))
        this.checktoken(this.idquan);

    }
    checktoken(idquan: number) {
        this.authService.checkTokenInnkeeperAndIdquan(idquan).subscribe(data => {
            if (!data.status) {
                this.router.navigate(['/dashboard/quans'])
            } else {
                this.getAllDatSanByInnkeeperAndIdquan(this.idquan,this.trangthai,this.time);
            }
        })
    }
    
    getAllDatSanByInnkeeperAndIdquan(idquan: number,trangthai:boolean,time:string){
        this.checkdatsans=false;
        this.dashboardService.getAllDatSanByInnkeeperAndIdquan(idquan,trangthai,time).subscribe(data=>{
            console.log(data);
            if(data.status){
                this.datsans=data.datsans;
                this.checkdatsans=true;
                this.changeDetectorRef.detectChanges();
            }  
        })
    }
    xacnhan(iddatsan: number){
        console.log(iddatsan);
        
        this.dashboardService.xacNhanDatsanByInnkeeper(iddatsan).subscribe(data=>{
            console.log(data);
            if (data.status) {
                Swal.fire({
                    icon: 'success',
                    title: data.message,
                    showConfirmButton: false,
                    timer: 1500
                });
                this.getAllDatSanByInnkeeperAndIdquan(this.idquan, this.trangthai, this.time);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: data.message,
                })

            }
        })
        
    }
    deleteDatSan(datsan:any){
        console.log(datsan);
        
    }
    ChangeStatus(){
        this.trangthai=!this.trangthai;
        this.getAllDatSanByInnkeeperAndIdquan(this.idquan,this.trangthai,this.time)
    }
}

