import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'category'
})
export class CategoryPipe implements PipeTransform {

  transform(value: string): string {
    switch(value) {
      case 'Home': return 'home'
      case 'Studies': return 'school'
      case 'Work': return 'work'
      case 'Health': return 'health_and_safety'
    }
    return ''
  }

}
