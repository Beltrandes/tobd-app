import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-toolbar',
  templateUrl: './main-toolbar.component.html',
  styleUrls: ['./main-toolbar.component.scss']
})
export class MainToolbarComponent {

  constructor(private router: Router) {}

  navigate(name: string) {
    switch(name) {
      case 'dashboard': return this.router.navigate(['/'])

      case 'tasks': return this.router.navigate(['/tasks'])

      case 'bills': return this.router.navigate(['/bills'])

      case 'diary': return this.router.navigate(['/diary'])


      default: return this.router.navigate(['/'])
    }
  }


}
