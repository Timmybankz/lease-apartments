import { NgModule } from '@angular/core';
import { AmountFormatterPipe } from './amount-formatter.pipe';

@NgModule({
  declarations: [
    AmountFormatterPipe
  ],
  exports: [
    AmountFormatterPipe
  ]
})
export class AmountFormatterModule { }
