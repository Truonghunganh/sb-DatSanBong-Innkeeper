import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Module */
import { DashboardModule } from './dashboard.module';

/* Containers */
import * as dashboardContainers from './containers';

import { environment } from './../../environments/environment';

/* Routes */
export const ROUTES: Routes = [
    // {
    //     path: '',
    //     canActivate: [],
    //     component: dashboardContainers.DashboardComponent,
    // },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/dashboard/quan',
        //redirectTo: 'quan/:iduser',
    },

    {
        path: 'quans',
        canActivate: [],
        component: dashboardContainers.DashboardComponent,
    },
    {
        path: 'addquan',
        canActivate: [],
        component: dashboardContainers.DashboardAddQuanByInnkeeperComponent,
    },
    {
        path: 'editQuan/:idquan',
        canActivate: [],
        component: dashboardContainers.DashboardComponent,
    },


    {
        path: 'innkeeper',
        canActivate: [],
        component: dashboardContainers.DashboardInnkeeperComponent,
    },
    {
        path: 'editinnkeeper',
        canActivate: [],
        component: dashboardContainers.DashboardInnkeeperEditComponent,
    },
    {
        path: 'editQuanByTokenInnkeeper/:idquan',
        canActivate: [],
        component: dashboardContainers.DashboardEditQuanByTokenInnkeeperComponent,
    },
    {
        path: 'quans/:idquan',
        canActivate: [],
        component: dashboardContainers.DashboardGetListSanByTokenInnkeepeAndIdquanComponent,
    },
    {
        path: 'addSan/:idquan',
        canActivate: [],
        component: dashboardContainers.DashboardAddSanByInnkeeperComponent,
    },

    {
        path: 'editSan/:id',
        canActivate: [],
        component: dashboardContainers.DashboardEditSanByInnkeeperComponent,
    },


];

@NgModule({
    imports: [DashboardModule, RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class DashboardRoutingModule {};
