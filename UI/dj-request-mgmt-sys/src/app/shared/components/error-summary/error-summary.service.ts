import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { DjFormError } from '../../interfaces';

export interface ErrorSummaryEvent {
  type: 'add' | 'remove' | 'clearAll';
  error?: DjFormError;
  errorId?: string;
  summaryName: string;
}

@Injectable({
  providedIn: 'root'
})
export class ErrorSummaryService {
  private errorEventSubject = new Subject<ErrorSummaryEvent>();

  /**
   * Observable that components can subscribe to for error events
   */
  get errorEvents$(): Observable<ErrorSummaryEvent> {
    return this.errorEventSubject.asObservable();
  }

  /**
   * Add an error to the specified error summary
   * @param error The DjFormError to add
   */
  addError(error: DjFormError): void {
    this.errorEventSubject.next({
      type: 'add',
      error: error,
      summaryName: error.summaryName
    });
  }

  /**
   * Remove an error from the specified error summary
   * @param errorId The ID of the error to remove
   * @param summaryName The name of the summary to remove from
   */
  removeError(errorId: string, summaryName: string): void {
    this.errorEventSubject.next({
      type: 'remove',
      errorId: errorId,
      summaryName: summaryName
    });
  }

  /**
   * Clear all errors from the specified error summary
   * @param summaryName The name of the summary to clear
   */
  clearAll(summaryName: string): void {
    this.errorEventSubject.next({
      type: 'clearAll',
      summaryName: summaryName
    });
  }
}