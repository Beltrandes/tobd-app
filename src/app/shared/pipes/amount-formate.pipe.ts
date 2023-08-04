import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'amountFormate'
})
export class AmountFormatePipe implements PipeTransform {

  transform(value: string | number): string {
    if (typeof value === 'string') {
      // Substituir ',' por '.' e vice-versa
      return value.replace(',', '|').replace('.', ',').replace('|', '.');
    } else if (typeof value === 'number') {
      return value.toString().replace('.', ',');
    }

    return value as string;
  }

}
