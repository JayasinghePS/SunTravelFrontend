import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  
  constructor(private router: Router, private route: ActivatedRoute) {

    // listen for route changes
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // get current route path (like 'hotel-page')
      const currentRoute = this.route.root.firstChild?.snapshot.routeConfig?.path ?? '';
  
      // update header color
      this.setHeaderColor(currentRoute);
    });
  }

  
  // dynamically switch header color class
  setHeaderColor(currentRoute: string): void {
    const header = document.querySelector('header');
  
    if (header) {
      header.classList.remove('color1', 'color2', 'color3');
  
      // These colors are in .css file
      if (currentRoute === 'search-page') {
        header.classList.add('color1');
      } else if (currentRoute === 'contract-page') {
        header.classList.add('color2');
      } else if (currentRoute === 'hotel-page') {
        header.classList.add('color3');
      }
      }
  }
  
  
}
