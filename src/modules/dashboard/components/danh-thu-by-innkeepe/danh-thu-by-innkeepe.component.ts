import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardService } from "../../services/dashboard.service";
import { AuthService } from '../../../auth/services/auth.service'
import Swal from 'sweetalert2';
import { Chart, ChartDataSets } from 'chart.js';
import { Color } from 'ng2-charts';

@Component({
    selector: 'sb-danh-thu-by-innkeepe',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './danh-thu-by-innkeepe.component.html',
    styleUrls: ['danh-thu-by-innkeepe.component.scss'],
})
export class DanhThuByInnkeepeComponent implements OnInit {
    month = new Date().toISOString().slice(0, 7);
    year=Number( new Date().toISOString().slice(0,4));
    idquan=0;
    checkdoanhthus=false;
    doanhthus:any;
    tongDanhthu=0;
    lineChartOptions = {
        responsive: true,
    };
    lineChartColors: Color[] = [
        {
            backgroundColor: [
                'rgba(255,0,0,0.3)', //đỏ
                'rgba(0,255,0,0.3)',//xanh lá cây
                'rgba(0,0,255,0.3)',//blue
                'rgba(192,192,192,0.3)',//grey
                'rgba(255,255,0,0.3)',//yellow
                'rgba(255,0,255,0.3)',// Cerise
                'rgba(255,0,0,0.3)', //đỏ
                'rgba(0,255,0,0.3)',//xanh lá cây
                'rgba(0,0,255,0.3)',//blue
                'rgba(192,192,192,0.3)',//grey
                'rgba(255,255,0,0.3)',//yellow
                'rgba(255,0,255,0.3)',// Cerise
               ]
        },
        
    ];
    data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    doanhthustheonam =[];
    lineChartTypeOB = 'bar';//'pie';//'line';
    lineChartDataOB: ChartDataSets[] =[];
    lineChartLabelsOB = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];
    checkdoanhthustheonam=false;
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
        console.log(this.year);
        
        this.checkTokenInnkeeperAndIdquan(this.idquan);
    }
    checkTokenInnkeeperAndIdquan(idquan: number) {
        this.authService.checkTokenInnkeeperAndIdquan(idquan).subscribe(data => {
            if (!data.status) {
                this.router.navigate(['/dashboard/quans'])

            } else {
                this.getDanhThuByInnkeeper();
                this.getTongDoanhThuTheoNamByInnkeeper(this.idquan, this.year);

            }
        })
    }
    tinhtongDanhthucuuanam (mang: any){
        console.log(mang);
        
        let tong=0;
        for (let i = 0; i < mang.length; i++) {
            tong+=mang[i];
            
        }
        return tong;
    }
    tongDanhthucuuanam =0;
    getTongDoanhThuTheoNamByInnkeeper(idquan: number, nam: number,) {
        this.checkdoanhthustheonam=false;
        this.dashboardService.getTongDoanhThuTheoNamByInnkeeper(idquan, nam).subscribe(
            data => {
                if(data.status){
                    this.doanhthustheonam = data.doanhthustheonam;
                    this.lineChartDataOB = [{ data: data.doanhthustheonam  }];
                    this.tongDanhthucuuanam=this.tinhtongDanhthucuuanam(this.doanhthustheonam);
                    this.checkdoanhthustheonam = true;
                    this.changeDetectorRef.detectChanges();
                }

            }
        )
    }

    tinhTongDanhThu(doanhthus: any){
        let tong=0;
        for (let i = 0; i < doanhthus.length; i++) {
            tong+=doanhthus[i].doanhthu;
            
        }
        return tong;
    }
    getDanhThuByInnkeeper(){
        this.checkdoanhthus= false;
        this.dashboardService.getDoanhThuByInnkeeper(this.idquan,this.month).subscribe(data => {
            console.log(data);
            
            if (data.status) {
                this.doanhthus=data.doanhthus;
                this.tongDanhthu=this.tinhTongDanhThu(this.doanhthus);
                console.log(this.tongDanhthu);
                
                this.checkdoanhthus=true;
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
    chonNam(){
        console.log(this.year);
        
    }
    //'bar';//'pie';//'line';
    dangBD="Biểu đồ cột";
    cot(){
        this.dangBD = "Biểu đồ cột";
        this.lineChartTypeOB="bar"
    }
    tron(){
        this.dangBD = "Biểu đồ hình tròn";
        this.lineChartTypeOB="pie";
    }
    duong(){
        this.dangBD="Biểu đồ đường";
        this.lineChartTypeOB="line";
    }
}
