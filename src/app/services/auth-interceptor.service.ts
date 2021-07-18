import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/internal/operators/catchError";
import { AppConfig } from "../components/appconfig";
import { LoginService } from "./login.service";


@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private loginService : LoginService, private _snackBar: MatSnackBar, private router: Router) { }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    try {
      //const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });
      let request = req;
     // if (request) {
      /*  request = req.clone({
          headers
        });
      }¨*/
      // return next.handle(request);
      return next.handle(request).pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.status !== 200) {
            sessionStorage.clear();
            this.router.navigateByUrl('');
            this.openSnackBar(String(AppConfig.settings.ErrorCatch), String(AppConfig.settings.ErrorCatchAction));
            this.loginService.enviaCondicion(false);
          }
          return throwError(err);
        })
      );
    } catch (error) {
      return throwError(error);
    }
  }
}

