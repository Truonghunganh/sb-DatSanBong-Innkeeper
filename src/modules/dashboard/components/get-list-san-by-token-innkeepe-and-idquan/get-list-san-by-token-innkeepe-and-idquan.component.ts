import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DashboardService } from "../../services/dashboard.service";
import { environment } from './../../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
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
    sans: any;
    quan: any;
    checkquan=false;
    url = environment.url;
    mangDatsan = new Array();
    today = new Date().toISOString().slice(0, 10);
    ngayvagio: string = "";
    checkdatsan = false;
    ngOnInit() {
        this.idquan = Number(this.activatedRoute.snapshot.paramMap.get('idquan'));

        this.checkTokenInnkeeperAndIdquan(this.idquan);
    }
    checkTokenInnkeeperAndIdquan(idquan: number) {
        this.checkquan=false;
        this.authService.checkTokenInnkeeperAndIdquan(idquan).subscribe(data => {
            console.log(data);

            if (!data.status) {
                this.router.navigate(['/dashboard/quans'])
            } else {
                this.quan=data.quan;
                this.reviewquan = Math.round(data.quan.review);
                this.mangreviewquan = this.taomotmangreview(this.reviewquan);
                this.checkquan=true;
                this.ngayvagio = new Date().toISOString().slice(0, 10);
                this.getDatSansvaSansByInnkeeperAndIdquanAndNgay(this.idquan, this.ngayvagio);
            }
        })
    }
    chonngay(ngay: any) {
        this.ngayvagio = ngay.target.value;
        console.log(ngay.target.value);
        this.getDatSansvaSansByInnkeeperAndIdquanAndNgay(this.idquan, ngay.target.value);

    }



    getDatSansvaSansByInnkeeperAndIdquanAndNgay(idquan: number, ngay: any) {
        this.checkdatsan = false;
        this.dashboardService.getDatSansvaSansByInnkeeperAndIdquanAndNgay(idquan, ngay).subscribe(data => {
            if (data.status) {
                this.mangDatsan = data.datsans;
                this.sans = data.sans;
                this.checkdatsan = true;
                this.ref.detectChanges();
            }
        })
    }
    mangreviewquan: any;
    reviewquan = 0;

    taomotmangreview(review: number) {
        switch (review) {
            case 0: return [false, false, false, false, false];
            case 1: return [true, false, false, false, false];
            case 2: return [true, true, false, false, false];
            case 3: return [true, true, true, false, false];
            case 4: return [true, true, true, true, false];
            case 5: return [true, true, true, true, true];
            default:
                break;
        }
    }

    hienthongtindatsan(datsan:any,san:any){
        console.log(datsan);
        Swal.fire({
            html: '<h1 style="color: #41c04d;">thông tin người đặt sân của người dùng</h1><table style="width: 100%;" border="1"><tr><td>tên người đặt </td><td>' + datsan.user.name + '</td></tr><tr><td>Số điện thoại người đặt </td><td>' + datsan.user.phone + '</td></tr><tr><td>tên sân </td><td>' + san.name + '</td></tr><tr><td>số người </td><td>' + san.numberpeople + '</td></tr><tr><td>số tiền thanh toán</td><td>' + san.priceperhour + '</td></tr><tr><td>giờ đặt</td><td>' +datsan.start_time + '</td></tr></table>',
            confirmButtonText: `Ok`,
        })
        
        
    }

    addSan(){
        this.router.navigate(['/dashboard/addSan/'+ this.idquan]);
    }
    xemdanhthu() {
        this.router.navigate(['dashboard/doanhthu/' + this.idquan]);
    } 
    xemdanhsachdatsan(){
        this.router.navigate(['dashboard/thongtindatsan/' + this.idquan]);
    }   


    
}
