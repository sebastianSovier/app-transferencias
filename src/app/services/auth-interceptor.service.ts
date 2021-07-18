import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/internal/operators/catchError";


@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const headers = new HttpHeaders({'Access-Control-Allow-Origin':'*'});

    let request = req;

    if (request) {
      request = req.clone({
          headers
      });
    }

    // return next.handle(request);
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {

        if (err.status !== 200) {
          sessionStorage.clear();
          this.router.navigateByUrl('');
        } 

        return throwError(err);

      })
    );
  }
}

