import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TgButtonComponent } from './button/button.component';
import { TgLoadingComponent } from './loading/loading.component';
import { TgCheckboxComponent } from './forms/checkbox/checkbox.component';

@NgModule({
  declarations: [
    TgButtonComponent,
    TgLoadingComponent,
    TgCheckboxComponent,
  ],
  exports: [
    TgButtonComponent,
    TgLoadingComponent,
    TgCheckboxComponent,
  ],
  imports: [
    CommonModule,
  ],
})
export class CommonComponentsModule { }
