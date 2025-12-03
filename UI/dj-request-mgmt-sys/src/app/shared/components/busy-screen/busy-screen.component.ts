import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-busy-screen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './busy-screen.component.html',
  styleUrl: './busy-screen.component.css'
})
export class BusyScreenComponent {
  @Input() isVisible: boolean = false;
  @Input() message: string = 'Loading...';
  @Input() showSpinner: boolean = true;
  @Input() backdropOpacity: number = 0.8;
  @Input() spinnerSize: 'sm' | 'md' | 'lg' = 'md';

  get backdropStyle() {
    return {
      'background-color': `rgba(255, 255, 255, ${this.backdropOpacity})`
    };
  }

  get spinnerClass() {
    return `spinner-border spinner-${this.spinnerSize}`;
  }
}
