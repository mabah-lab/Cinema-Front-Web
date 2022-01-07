import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CimemaComponent} from './cimema/cimema.component';

const routes: Routes = [
  {path: 'cinema', component: CimemaComponent },
  {path: '', redirectTo: 'cinema', pathMatch: 'full'},
  {path: '**', redirectTo: 'cinema'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
