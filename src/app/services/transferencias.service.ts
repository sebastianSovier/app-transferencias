import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from '../components/appconfig';

@Injectable({
  providedIn: 'root'
})
export class TransferenciasService {

  constructor(private http: HttpClient) { }


  ObtenerHistorialMovimientos() {
    const headers = new HttpHeaders({'Authorization':'Bearer '+sessionStorage.getItem('token'),'Access-Control-Allow-Origin':'*'});
    const result: Observable<any> = this.http.get(AppConfig.settings.UrlApi + '/Movimientos/ObtenerMovimientos',{headers: headers});
    return result;
  }
  CrearTransferencia(transferenciaRequest: any) {
    const headers = new HttpHeaders({'Authorization':'Bearer '+sessionStorage.getItem('token'),'Access-Control-Allow-Origin':'*'});
    const result: Observable<any> = this.http.post(AppConfig.settings.UrlApi + '/Movimientos/IngresarTransferencia', transferenciaRequest,{headers: headers});
    return result;
  }

}
