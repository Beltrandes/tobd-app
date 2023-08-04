import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {

  transform(value: string): string {
    switch(value) {
      case 'Pending': return 'pending'
      case 'Paid': return 'paid'
      case 'Late': return 'error'
    }
    return ''
  }

}
