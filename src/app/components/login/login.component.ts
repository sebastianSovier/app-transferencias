import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthInterceptorService } from 'src/app/services/auth-interceptor.service';
import { LoadingPageService } from 'src/app/services/loading-page.service';
import { LoginService } from 'src/app/services/login.service';
import { AppConfig } from '../appconfig';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  loginForm = new FormGroup({});
  crearCuentaForm = new FormGroup({});
  loginRequest: any = {};
  login = true;
  logged = false;
  contrasenaIguales = false;
  constructor(private interceptor: AuthInterceptorService, fb: FormBuilder, private loginService: LoginService, private router: Router, private loading: LoadingPageService, private _snackBar: MatSnackBar) {
    this.loginService.emisor.subscribe((d: { mostrarMenu: boolean }) => {
      this.logged = d.mostrarMenu;
    });
    sessionStorage.clear();
    this.loginForm = fb.group(
      {
        usuario: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
        contrasena: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]

      }
    );
    this.crearCuentaForm = fb.group(
      {
        usuario: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
        contrasena: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
        nombre_completo: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
        correo: ['', [Validators.email, Validators.required, Validators.minLength(6), Validators.maxLength(60)]],
        contrasenaRepetir: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
      }
    );
  }
  get usuarioCrear() { return this.crearCuentaForm.value.usuario }

  get contrasenaCrear() { return this.crearCuentaForm.value.contrasena; }

  get nombre_completoCrear() { return this.crearCuentaForm.value.nombre_completo }

  get correoCrear() { return this.crearCuentaForm.value.correo; }
  get contrasenaRepetirCrear() { return this.crearCuentaForm.value.contrasenaRepetir; }

  comparaContrasenas() {
    if (this.contrasenaCrear === this.contrasenaRepetirCrear) {
      this.contrasenaIguales = true;
    } else {
      this.crearCuentaForm.controls['contrasenaRepetir'].setErrors({ 'incorrect': 'Contraseña deben ser iguales' });
      this.contrasenaIguales = false;
    }
  }
  volver() {
    this.login = true;
  }
  nuevoUsuario() {
    this.login = false;
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  ngOnInit(): void {
    sessionStorage.clear();
    this.loading.cambiarestadoloading(false);
  }

  get usuario() { return this.loginForm.value.usuario }
  get contrasena() { return this.loginForm.value.contrasena; }

  isValidInput(fieldName: string | number): boolean {
    return this.loginForm.controls[fieldName].invalid &&
      (this.loginForm.controls[fieldName].dirty || this.loginForm.controls[fieldName].touched);
  }
  isValidInputCrear(fieldName: string | number): boolean {
    return this.crearCuentaForm.controls[fieldName].invalid &&
      (this.crearCuentaForm.controls[fieldName].dirty || this.crearCuentaForm.controls[fieldName].touched);
  }
  onSubmit(f: FormGroup) {
    try {
      if (f.valid) {
        this.loading.cambiarestadoloading(true);
        const loginRequest = { Username: this.usuario, Password: this.contrasena };
        this.loginService.IniciarSesion(loginRequest).subscribe((datos) => {
          if (datos.Error !== undefined) {
            sessionStorage.clear();
            this.openSnackBar("Credenciales Inválidas.", "Reintente");
          } else if (datos.access_Token !== undefined && datos.access_Token.length > 0 && datos.auth === true) {
            this._snackBar.dismiss();
            sessionStorage.setItem('token', datos.access_Token);
            this.logged = true;
            this.loginService.enviaCondicion(true);
          } else {
            this.router.navigateByUrl('');
          }
        });
      }
    } catch (error) {
      this.openSnackBar(String(AppConfig.settings.ErrorCatch), String(AppConfig.settings.ErrorCatchAction));
    } finally {
      this.loading.cambiarestadoloading(false);
    }
  }
  CrearUsuario(f: FormGroup) {
    try {
      if (f.valid) {
        this.loading.cambiarestadoloading(true);
        const loginRequest = { usuario: this.usuarioCrear, contrasena: this.contrasenaCrear, nombre_completo: this.nombre_completoCrear, correo: this.correoCrear };
        this.loginService.CrearUsuario(loginRequest).subscribe((datos: {Codigo:string ,Error: undefined; datos: string; }) => {
          if (datos.Error !== undefined) {
            this.openSnackBar("Hubo problemas al crear su usuario Intente nuevamente.", "Reintente");
          } else {
            if (datos.Codigo === "0") {
              this.login = true;
              this.openSnackBar("Usuario creado exitosamente.", "Ok");
            } else {
              this.openSnackBar("Hubo problemas para validar su usuario", "Reintente");
            }
          }
          console.log(datos);
        });
      }
    } catch (error) {
      this.openSnackBar(String(AppConfig.settings.ErrorCatch), String(AppConfig.settings.ErrorCatchAction));
    } finally {
      sessionStorage.clear();
      this.loading.cambiarestadoloading(false);
    }
  }
}
