import { RxjsComponent } from './rxjs/rxjs.component';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { NgModule } from '@angular/core';

import { AdminGuard } from './../guards/admin.guard';
import { AuthGuard } from './../guards/auth.guard';

import { Grafica1Component } from './grafica1/grafica1.component';
import { ProgressComponent } from './progress/progress.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';

const routes: Routes = [

    {
        path: 'dashboard',
        component: PagesComponent,
        canActivate: [ AuthGuard ],
        children: [
            { path: '', component: DashboardComponent, data: {titulo: 'Dashboard'} },
            { path: 'progress', component: ProgressComponent, data: {titulo: 'Progress'}},
            { path: 'grafica1', component: Grafica1Component, data: {titulo: 'Grafica1'}},
            { path: 'account-settings', component: AccountSettingsComponent, data: {titulo: 'Ajustes de cuenta'}},
            { path: 'buscar/:termino', component: BusquedaComponent, data: {titulo: 'Busquedas'}},
            { path: 'promesas', component: PromesasComponent, data: {titulo: 'Promesas'}},
            { path: 'rxjs', component: RxjsComponent, data: {titulo: 'Rxjs'}},
            { path: 'perfil', component: PerfilComponent, data: {titulo: 'Perfil de usuario'}},

            // Mantenimientos
            { path: 'hospitales', component: HospitalesComponent, data: {titulo: 'Hospitales de aplicación'}},
            { path: 'medicos', component: MedicosComponent, data: {titulo: 'Medicos de aplicación'}},
            { path: 'medico/:id', component: MedicoComponent, data: {titulo: 'Medicos de aplicación'}},

            // RUTAS ADMIN
            { path: 'usuarios', canActivate: [AdminGuard], component: UsuariosComponent, data: {titulo: 'Usuarios de aplicación'}},
        
        ]
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PagesRoutingModule { }
