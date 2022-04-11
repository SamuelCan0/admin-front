import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { OperacionesGComponent } from './components/operaciones-g/operaciones-g.component';
import { OperacionesComponent } from './components/operaciones/operaciones.component';

const routes: Routes = [
  {path:'inicio',component:InicioComponent},
  {path:'operP',component:OperacionesComponent},
  {path:'operP/:id',component:OperacionesComponent},
  {path:'operG/:id',component:OperacionesGComponent},
  {path:'operG',component:OperacionesGComponent},
  {path:'**',redirectTo:'inicio',pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
