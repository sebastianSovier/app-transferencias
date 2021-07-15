import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingPageService } from 'src/app/services/loading-page.service';
import { LoadingPageComponent } from 'src/app/Utils/loading-page/loading-page.component';


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