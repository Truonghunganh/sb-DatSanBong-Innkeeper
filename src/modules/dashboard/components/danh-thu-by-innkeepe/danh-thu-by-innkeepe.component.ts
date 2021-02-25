import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardService } from "../../services/dashboard.service";
import { AuthService } from '../../../auth/services/auth.service'
import Swal from 'sweetalert2';

@Component({
    selector: 'sb-danh-thu-by-innkeepe',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './danh-thu-by-innkeepe.component.html',
    styleUrls: ['danh-thu-by-innkeepe.component.scss'],
})
export class DanhThuByInnkeepeComponent implements OnInit {
    month = new Date().toISOString().slice(0, 7);
    idquan=0;
    checkdanhthu=false;
    danhthus:any;
    constructor(
        private dashboardService: DashboardService, 
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private authService: AuthService,
        private changeDetectorRef: ChangeDetectorRef,
        ) {}
    ngOnInit() {
        this.idquan=Number(this.activatedRoute.snapshot.paramMap.get('idquan'));
        console.log(this.idquan);
        this.checkTokenInnkeeperAndIdquan(this.idquan);
    }
    checkTokenInnkeeperAndIdquan(idquan: number) {
        this.authService.checkTokenInnkeeperAndIdquan(idquan).subscribe(data => {
            if (!data.status) {
                this.router.navigate(['/dashboard/quans'])

            } else {
                this.getDanhThuByInnkeeper();
            }
        })
    }
    getDanhThuByInnkeeper(){
        this.checkdanhthu= false;
        this.dashboardService.getDanhThuByInnkeeper(this.idquan,this.month).subscribe(data => {
            console.log(data);
            
            if (data.status) {
                this.danhthus=data.danhthus;
                this.checkdanhthu=true;
                this.changeDetectorRef.detectChanges();

            } else {
                Swal.fire({
                    icon: 'error',
                    title: data.message,
                })
      
            }
        })
    }
    chonthang(thang: any) {
        this.month=thang.target.value
        this.getDanhThuByInnkeeper();
       
    }
    break(){
        this.router.navigate(['dashboard/quans/'+this.idquan])
    }
}
