import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from '../components/appconfig';

@Injectable({
  providedIn: 'root'
})
export class DestinatarioService {

  constructor(private http: HttpClient) { }


  ObtenerDestinatarios() {
    const headers = new HttpHeaders({'Authorization':'Bearer '+sessionStorage.getItem('token'),'Access-Control-Allow-Origin': '*' });
    const result: Observable<any> = this.http.get(AppConfig.settings.UrlApi +'/Destinatario/ObtenerDestinatario',{headers: headers});
    return result;
  }

  CrearDestinatario(DestinatarioRequest: any) {
    const headers = new HttpHeaders({'Authorization':'Bearer '+sessionStorage.getItem('token'),'Access-Control-Allow-Origin': '*'});
    const result: Observable<any> = this.http.post(AppConfig.settings.UrlApi +'/Destinatario/IngresarDestinatario', DestinatarioRequest,{headers: headers});
    return result;
  }
  ObtenerBancos() {
    const result: Observable<any> = this.http.get("https://bast.dev/api/banks.php");
    return result;
  }
}
