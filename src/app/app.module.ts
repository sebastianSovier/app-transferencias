import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NuevoDestinatarioComponent } from './components/nuevo-destinatario/nuevo-destinatario.component';
import { GenerarTransferenciaComponent } from './components/generar-transferencia/generar-transferencia.component';
import { HistorialMovimientosComponent } from './components/historial-movimientos/historial-movimientos.component';
import { LoginComponent } from './components/login/login.component';
import { AppConfig } from './components/appconfig';
import { LoadingPageService } from './services/loading-page.service';
import { HttpClientJsonpModule, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoadingPageModule } from './components/login/loading-page.module';
import { MatSliderModule } from '@angular/material/slider';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule,} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatStepperModule} from '@angular/material/stepper';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSelectModule} from '@angular/material/select';
import { DirectiveModule } from './Utils/pipes/directivas.module';
import { FormatRutDirective } from './Utils/pipes/format-rut.directive';
import { FormatRutPipe } from './Utils/pipes/format-rut.pipe';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { AuthInterceptorService } from './services/auth-interceptor.service';
export function initializeApp(appConfig: AppConfig) {
	return () => appConfig.load();
}

@NgModule({
  declarations: [
    AppComponent,
    NuevoDestinatarioComponent,
    GenerarTransferenciaComponent,
    HistorialMovimientosComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    LoadingPageModule,
    DirectiveModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatSliderModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatSortModule,
    MatStepperModule,
    MatSnackBarModule,
    MatDialogModule,
    MatExpansionModule,
    MatSidenavModule,
  ],
  providers: [ FormatRutDirective,
		FormatRutPipe,LoadingPageService,
    AppConfig,
    {
			provide: APP_INITIALIZER,
			useFactory: initializeApp,
			deps: [AppConfig],
			multi: true,
		},
     {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
