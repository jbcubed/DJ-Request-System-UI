import { Directive } from '@angular/core';

@Directive()
export abstract class SubscriptionManagedComponent {
  abstract createSubscriptions(): void;
  abstract destroySubscriptions(): void;

  ngOnDestroy(): void {
    this.destroySubscriptions();
  }
}

