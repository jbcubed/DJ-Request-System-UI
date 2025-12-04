import { Directive } from '@angular/core';

@Directive()
export abstract class UIManagedComponent {
  abstract initializeUI(): void;

   ngOnInit(): void {
    this.initializeUI();
  }
}
