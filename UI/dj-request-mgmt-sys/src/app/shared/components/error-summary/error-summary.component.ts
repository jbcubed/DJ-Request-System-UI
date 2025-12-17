import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { DjFormError } from '../../interfaces';
import { ErrorSummaryService, ErrorSummaryEvent } from './error-summary.service';
import { SubscriptionManagedComponent } from '../../AbstractClasses/SubscriptionManagedComponent';

@Component({
  selector: 'app-error-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error-summary.component.html',
  styleUrl: './error-summary.component.css'
})
export class ErrorSummaryComponent extends SubscriptionManagedComponent implements OnInit {
  @Input() name: string = '';

  errors: DjFormError[] = [];
  private destroy$ = new Subject<void>();

  constructor(private errorSummaryService: ErrorSummaryService) {
    super();
  }

  ngOnInit(): void {
    this.createSubscriptions();
  }

  createSubscriptions(): void {
    // Subscribe to error events from the service
    this.errorSummaryService.errorEvents$
      .pipe(takeUntil(this.destroy$))
      .subscribe((event: ErrorSummaryEvent) => {
        this.handleErrorEvent(event);
      });
  }

  destroySubscriptions(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Handle error events from the service
   * @param event The error event to handle
   */
  private handleErrorEvent(event: ErrorSummaryEvent): void {
    // Only process events for this summary
    if (event.summaryName !== this.name) {
      return;
    }

    switch (event.type) {
      case 'add':
        if (event.error) {
          this.addError(event.error);
        }
        break;
      case 'remove':
        if (event.errorId) {
          this.removeError(event.errorId);
        }
        break;
      case 'clearAll':
        this.clearAllErrors();
        break;
    }
  }

  /**
   * Add an error to the summary
   * @param error The error to add
   */
  private addError(error: DjFormError): void {
    // Check if error already exists (by ID) and update it, otherwise add new
    const existingIndex = this.errors.findIndex(e => e.id === error.id);
    if (existingIndex >= 0) {
      this.errors[existingIndex] = error;
    } else {
      this.errors.push(error);
    }
  }

  /**
   * Remove an error from the summary
   * @param errorId The ID of the error to remove
   */
  private removeError(errorId: string): void {
    this.errors = this.errors.filter(error => error.id !== errorId);
  }

  /**
   * Clear all errors from the summary
   */
  private clearAllErrors(): void {
    this.errors = [];
  }

  /**
   * Get the formatted error message (description + instructions with proper punctuation)
   * @param error The error to format
   * @returns The formatted error message
   */
  getFormattedErrorMessage(error: DjFormError): string {
    let message = error.description;
    
    // Add instructions if they exist
    if (error.instructions) {
      // Ensure description ends with proper punctuation before adding instructions
      if (!message.match(/[.!?]$/)) {
        message += '.';
      }
      message += ` ${error.instructions}`;
    }
    
    // Ensure the final message ends with a period
    if (!message.match(/[.!?]$/)) {
      message += '.';
    }
    
    return message;
  }

  /**
   * Navigate to and focus on the form element with the given HTML ID
   * @param htmlId The HTML ID of the element to focus
   * @param event The click event (to prevent default)
   */
  navigateToElement(htmlId: string, event: Event): void {
    event.preventDefault();
    
    const element = document.getElementById(htmlId);
    if (element) {
      // Scroll the element into view
      element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      });
      
      // Set focus after a short delay to ensure scrolling completes
      setTimeout(() => {
        element.focus();
      }, 100);
    }
  }

  /**
   * Track by function for ngFor to improve performance
   * @param index The index of the item
   * @param error The error item
   * @returns The unique identifier for tracking
   */
  trackByErrorId(index: number, error: DjFormError): string {
    return error.id;
  }

  /**
   * Check if there are any errors to display
   * @returns True if there are errors, false otherwise
   */
  get hasErrors(): boolean {
    return this.errors.length > 0;
  }
}