import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingPageComponent } from './loading-page.component';
import { LoadingPageService } from 'src/app/services/loading-page.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    LoadingPageComponent
  ],
  exports: [
    LoadingPageComponent
  ],
  providers: [
    LoadingPageService
  ]
})
export class LoadingPageModule { }