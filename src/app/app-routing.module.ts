import { AuthRoutingModule } from './auth/auth.routing';
import { NgModule } from '@angular/core';

//Modules
import { PagesRoutingModule } from './pages/pages.routing';

import { RouterModule, Routes } from '@angular/router';
import { NopagesfoundComponent } from './nopagesfound/nopagesfound.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {path: '**', component: NopagesfoundComponent }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot( routes ),
    PagesRoutingModule,
    AuthRoutingModule
  ]
})
export class AppRoutingModule { }
