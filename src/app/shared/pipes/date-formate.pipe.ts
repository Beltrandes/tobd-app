import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormate'
})
export class DateFormatePipe implements PipeTransform {

  transform(value: string): string {
    if (!value) {
      return ''
    }

    const parts = value.split('-')
    if (parts.length !== 3) {
      return value
    }

    const day = parts[2]
    const month = parts[1]
    const year = parts[0]

    return `${day}/${month}/${year}`

  }

}
