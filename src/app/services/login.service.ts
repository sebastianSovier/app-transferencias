import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AppConfig } from '../components/appconfig';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private subject: Subject<any> = new Subject<any>();
  public emisor: any = this.subject.asObservable();

  constructor(private http: HttpClient) { }

  enviaCondicion(mostrarMenu:boolean) {
    // al que lo este escuchando...
    this.subject.next({ mostrarMenu });
  }

  IniciarSesion(loginRequest: any) {
    const headers = new HttpHeaders({'Access-Control-Allow-Origin':'*'});
    const result: Observable<any> = this.http.post(AppConfig.settings.UrlApi +'/Account/Login', loginRequest,{headers: headers});
    return result;
  }
  CrearUsuario(loginRequest: any) {
    const headers = new HttpHeaders({'Access-Control-Allow-Origin':'*'});
    const result: Observable<any> = this.http.post(AppConfig.settings.UrlApi +'/Account/IngresarUsuario', loginRequest,{headers: headers});
    return result;
  }
}
