import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Transferencias } from 'src/app/models/transferencias.model';
import { LoadingPageService } from 'src/app/services/loading-page.service';
import { TransferenciasService } from 'src/app/services/transferencias.service';
import { AppConfig } from '../appconfig';

@Component({
  selector: 'app-historial-movimientos',
  templateUrl: './historial-movimientos.component.html',
  styleUrls: ['./historial-movimientos.component.scss']
})
export class HistorialMovimientosComponent implements OnInit {
  TransferenciasData: any = [];
  displayedColumns: string[] = ['nombre_destinatario', 'rut_destinatario', 'banco_destino', 'tipo_cuenta', 'monto_transferencia'];
  dataSourceTransferencias = new MatTableDataSource<Transferencias>(this.TransferenciasData);
  private paginatorCiudad!: MatPaginator;

  @ViewChild('paginator') set matPaginatorCiudad(mp: MatPaginator) {
    this.paginatorCiudad = mp;
    this.setDataSourceAttributes();
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  setDataSourceAttributes() {
    this.dataSourceTransferencias.paginator = this.paginatorCiudad;
  }
  constructor(private _snackBar: MatSnackBar, private loading: LoadingPageService, private transferenciasService: TransferenciasService) { }

  ngOnInit(): void {
    this.loading.cambiarestadoloading(true);
    this.ConsultarMovimientos();
  }

  ConsultarMovimientos() {
    try {
      this.loading.cambiarestadoloading(true);
      this.transferenciasService.ObtenerHistorialMovimientos().subscribe((datos) => {
        console.log(datos);
        if(datos.datos.Codigo === AppConfig.settings.CodigoExitoso){
          this.TransferenciasData = datos.datos.data.data;
          this.dataSourceTransferencias.data = this.TransferenciasData;
        }else{
          this.openSnackBar(String(AppConfig.settings.ErrorCatch), String(AppConfig.settings.ErrorCatchAction));
        }
      });
    } catch (error) {
      this.openSnackBar(String(AppConfig.settings.ErrorCatch), String(AppConfig.settings.ErrorCatchAction));
    } finally {
      this.loading.cambiarestadoloading(false);
    }
  }
}
