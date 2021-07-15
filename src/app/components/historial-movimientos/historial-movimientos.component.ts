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
  private sortCiudad!: MatSort;


  @ViewChild('paginatorCiudad') set matPaginatorCiudad(mpC: MatPaginator) {
    this.paginatorCiudad = mpC;
    this.setDataSourceAttributes();
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
  @ViewChild('sortCiudad') set matSortCiudad(msC: MatSort) {
    this.sortCiudad = msC;
    this.setDataSourceAttributes();
  }

  setDataSourceAttributes() {
    this.dataSourceTransferencias.paginator = this.paginatorCiudad;
    this.dataSourceTransferencias.sort = this.sortCiudad
  }
  constructor(private _snackBar: MatSnackBar, private loading: LoadingPageService, private transferenciasService: TransferenciasService) { }

  ngOnInit(): void {
    this.ConsultarMovimientos();
  }

  ConsultarMovimientos() {
    try {
      this.loading.cambiarestadoloading(true);
      this.transferenciasService.ObtenerHistorialMovimientos().subscribe((datos) => {
        //this.ciudades = datos.data;
        this.TransferenciasData = datos.datos.data;
        this.dataSourceTransferencias.data = this.TransferenciasData;
      });
    } catch (error) {
      this.openSnackBar(AppConfig.settings.ErrorCatch.metadata, AppConfig.settings.ErrorCatchAction.metadata);
    } finally {
      this.loading.cambiarestadoloading(false);
    }
  }
}
