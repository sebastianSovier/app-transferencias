import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Destinatario } from 'src/app/models/destinatario.model';
import { DestinatarioService } from 'src/app/services/destinatario.service';
import { LoadingPageService } from 'src/app/services/loading-page.service';
import { TransferenciasService } from 'src/app/services/transferencias.service';
import { map, startWith } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppConfig } from '../appconfig';
@Component({
  selector: 'app-generar-transferencia',
  templateUrl: './generar-transferencia.component.html',
  styleUrls: ['./generar-transferencia.component.scss']
})
export class GenerarTransferenciaComponent implements OnInit {

  ingresarTransferenciaFormGroup = new FormGroup({});
  nombre = '';
  correo = '';
  banco = '';
  tipoCuenta = '';
  listaDestinatarios: Destinatario[] = [];
  selectedDestinatario: Destinatario = new Destinatario();
  constructor(private _snackBar: MatSnackBar, private route: Router, public dialog: MatDialog, private destinatarioService: DestinatarioService, private transferenciasService: TransferenciasService, private loading: LoadingPageService, private _formBuilder: FormBuilder) {
  }
  ngOnInit(): void {
    this.loading.cambiarestadoloading(true);
    this.ObtenerDestinatarios();
    this.ingresarTransferenciaFormGroup = this._formBuilder.group({
      monto_transferencia: ['', [Validators.required, Validators.min(1)]],
      nombre_destinatario: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]]
    });
  }

  get getMontoTransferencia() { return this.ingresarTransferenciaFormGroup.value.monto_transferencia }

  IngresarTransferencia() {
    try {
      this.loading.cambiarestadoloading(true);
      if (this.ingresarTransferenciaFormGroup.valid) {
        const objetoTransferencia = { destinatario_id: this.selectedDestinatario.destinatario_id, monto_transferencia: this.getMontoTransferencia,usuario:sessionStorage.getItem('usuario') };
        this.transferenciasService.CrearTransferencia(objetoTransferencia).subscribe((datos) => {
          if (datos.datos.Codigo === AppConfig.settings.CodigoExitoso) {
            this.selectedDestinatario = new Destinatario();
            this.ingresarTransferenciaFormGroup.reset();
            this.ingresarTransferenciaFormGroup.clearValidators();
            this.openSnackBar("operacion exitosa", "Aceptar");
          } else {
            this.openSnackBar(String(AppConfig.settings.ErrorCatch), String(AppConfig.settings.ErrorCatchAction));
          }
        });
      }
    } catch (error) {
      this.openSnackBar(String(AppConfig.settings.ErrorCatch), String(AppConfig.settings.ErrorCatchAction));
    } finally {
      this.loading.cambiarestadoloading(false);

    }
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
  ObtenerDestinatarios() {
    try {
      this.loading.cambiarestadoloading(true);
      const requestDestinatarios = { usuario: sessionStorage.getItem('usuario') }
      this.destinatarioService.ObtenerDestinatarios(requestDestinatarios).subscribe((datos) => {
        if (datos.datos.Codigo === AppConfig.settings.CodigoExitoso) {
          this.listaDestinatarios = datos.datos.data.data;
          console.log(this.listaDestinatarios);
        } else {
          this.openSnackBar(String(AppConfig.settings.ErrorCatch), String(AppConfig.settings.ErrorCatchAction));
        }
      });

    } catch (error) {
      this.openSnackBar(String(AppConfig.settings.ErrorCatch), String(AppConfig.settings.ErrorCatchAction));
    } finally {
      this.loading.cambiarestadoloading(false);

    }
  }

  CompletarDetallesDestinatario(destinatario: any) {
    try {
      this.loading.cambiarestadoloading(true);
      this.selectedDestinatario = destinatario;
    } catch (error) {
      this.openSnackBar(String(AppConfig.settings.ErrorCatch), String(AppConfig.settings.ErrorCatchAction.metadata));
    } finally {
      this.loading.cambiarestadoloading(false);
    }
  }
}

