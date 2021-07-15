import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Mi Banco - Nueva Transferencia';
  mostrar = false;
  constructor(private route: Router, private loginService: LoginService) {
    this.loginService.emisor.subscribe((d: { mostrarMenu: boolean }) => {
      this.mostrar = d.mostrarMenu;
    });
  }

  ngOnInit() {
    sessionStorage.clear();
    this.route.navigateByUrl('');
  }
  LogOut() {
    sessionStorage.clear();
    this.route.navigateByUrl('');
    this.loginService.enviaCondicion(false);
  }
}
