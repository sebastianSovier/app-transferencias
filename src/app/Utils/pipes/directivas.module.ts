import { NgModule, ModuleWithProviders } from '@angular/core';

import { FormatRutDirective } from './format-rut.directive';
import { FormatRutPipe } from './format-rut.pipe';



@NgModule({
  imports: [],
  declarations: [
    FormatRutPipe,
    FormatRutDirective,

  ],
  exports: [
    FormatRutPipe,
    FormatRutDirective,

  ],
  providers: [
    FormatRutDirective,

  ]
})

export class DirectiveModule {
  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: DirectiveModule,
      providers: [
        FormatRutPipe,
      ]
    };
  }
}

export class DirectivasModule { }
