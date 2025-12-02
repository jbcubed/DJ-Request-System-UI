import { Component } from '@angular/core';

@Component({
  selector: 'app-dj-sys-header',
  imports: [],
  templateUrl: './dj-sys-header.component.html',
  styleUrl: './dj-sys-header.component.css'
})
export class DjSysHeaderComponent {
  activeLink: string = 'home';
  isNavbarOpen: boolean = false;

  setActiveLink(link: string): void {
    this.activeLink = link;
    this.isNavbarOpen = false; // Close mobile menu when item is selected
  }

  toggleNavbar(): void {
    this.isNavbarOpen = !this.isNavbarOpen;
  }
}
