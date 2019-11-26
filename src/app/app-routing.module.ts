import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaterialModule } from './components/material/material.module';
import { MaterialComponent } from './components/material/material.component';


const routes: Routes = [
  {
    path: '**',
    pathMatch: 'full',
    component: MaterialComponent
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes), MaterialModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
