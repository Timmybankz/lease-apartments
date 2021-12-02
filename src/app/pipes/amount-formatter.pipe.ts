import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'formatNumber' })
export class AmountFormatterPipe implements PipeTransform {
  transform(amount: number) {
    // Create our number formatter.
    var formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
    return formatter.format(amount);
  }
}
