import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenerarTransferenciaComponent } from './components/generar-transferencia/generar-transferencia.component';
import { HistorialMovimientosComponent } from './components/historial-movimientos/historial-movimientos.component';
import { LoginComponent } from './components/login/login.component';
import { NuevoDestinatarioComponent } from './components/nuevo-destinatario/nuevo-destinatario.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'transferencias', component: GenerarTransferenciaComponent },
  { path: 'historial-movimientos', component: HistorialMovimientosComponent },
  { path: 'nuevo-destinatario', component: NuevoDestinatarioComponent },
  { path: '', pathMatch: 'full', redirectTo: '' },
  // cambiar
  { path: '**', redirectTo: '' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
