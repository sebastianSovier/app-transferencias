import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Bancos } from 'src/app/models/bancos.model';
import { DestinatarioService } from 'src/app/services/destinatario.service';
import { LoadingPageService } from 'src/app/services/loading-page.service';
import { FormatRutPipe } from 'src/app/Utils/pipes/format-rut.pipe';
import { AppConfig } from '../appconfig';

@Component({
  selector: 'app-nuevo-destinatario',
  templateUrl: './nuevo-destinatario.component.html',
  styleUrls: ['./nuevo-destinatario.component.scss']
})
export class NuevoDestinatarioComponent implements OnInit {

  ingresarDestinatarioFormGroup = new FormGroup({});
  listaBancos: Bancos[] = [];
  listaCuentas = [{ name: 'Cuenta Vista' }, { name: 'Cuenta Corriente' }];

  constructor(private _snackBar: MatSnackBar, private rutproperties: FormatRutPipe, private route: Router, public dialog: MatDialog, private destinatarioService: DestinatarioService, private loading: LoadingPageService, private _formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.ObtenerBancos();
    this.ingresarDestinatarioFormGroup = this._formBuilder.group({
      nombre_destinatario: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      rut_destinatario: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      dv_destinatario: ['', []],
      correo_destinatario: ['', [Validators.email, Validators.required, Validators.minLength(10), Validators.maxLength(70)]],
      telefono_destinatario: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
      banco_destino: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(50)]],
      tipo_cuenta: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(50)]],
      numero_cuenta: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]]
    });
  }
  get getNombreDestinatario() { return this.ingresarDestinatarioFormGroup.value.nombre_destinatario }
  get getRutDestinatario() { return this.ingresarDestinatarioFormGroup.value.rut_destinatario; }
  get getDvDestinatario() { return this.ingresarDestinatarioFormGroup.value.dv_destinatario }
  get getCorreoDestinatario() { return this.ingresarDestinatarioFormGroup.value.correo_destinatario; }
  get getTelefonoDestinatario() { return this.ingresarDestinatarioFormGroup.value.telefono_destinatario }
  get getBancoDestino() { return this.ingresarDestinatarioFormGroup.value.banco_destino; }
  get getTipoCuenta() { return this.ingresarDestinatarioFormGroup.value.tipo_cuenta }
  get getNumeroCuenta() { return this.ingresarDestinatarioFormGroup.value.numero_cuenta; }


  IngresarDestinatario() {
    try {

      this.loading.cambiarestadoloading(true);
      if (this.ingresarDestinatarioFormGroup.valid) {
        const objetoDestinatario = {
          nombre_destinatario: this.getNombreDestinatario, rut_destinatario: this.getRutDestinatario, dv_destinatario: this.rutproperties.devuelveDigito(this.getRutDestinatario),
          correo_destinatario: this.getCorreoDestinatario, telefono_destinatario: this.getTelefonoDestinatario, banco_destino: this.getBancoDestino, tipo_cuenta: this.getTipoCuenta, numero_cuenta: this.getNumeroCuenta
        };
        this.destinatarioService.CrearDestinatario(objetoDestinatario).subscribe((datos) => {
          if (datos.datos.Codigo === "0") {
            this.ingresarDestinatarioFormGroup.reset();
            this.openSnackBar("operacion exitosa","Aceptar");
          } else {
            this.openSnackBar(AppConfig.settings.ErrorCatch.metadata, AppConfig.settings.ErrorCatchAction.metadata);
          }
        });
      }
    } catch (error) {
    } finally {
      this.loading.cambiarestadoloading(false);
    }
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
  ObtenerBancos() {
    try {
      this.loading.cambiarestadoloading(true);
      this.destinatarioService.ObtenerBancos().subscribe((datos) => {
        this.listaBancos = datos.banks;
      });
    } catch (error) {
      this.openSnackBar(AppConfig.settings.ErrorCatch.metadata, AppConfig.settings.ErrorCatchAction.metadata);
    } finally {
      this.loading.cambiarestadoloading(false);
    }


  }

}
