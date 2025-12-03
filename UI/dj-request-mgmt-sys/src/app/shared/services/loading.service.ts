import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingCount = 0;
  private loadingSubject = new BehaviorSubject<boolean>(false);

  constructor() { }

  /**
   * Observable that emits the current loading state
   */
  get loading$(): Observable<boolean> {
    return this.loadingSubject.asObservable();
  }

  /**
   * Get the current loading state
   */
  get isLoading(): boolean {
    return this.loadingSubject.value;
  }

  /**
   * Start loading - increment the counter and set loading to true
   */
  startLoading(): void {
    this.loadingCount++;
    if (this.loadingCount === 1) {
      this.loadingSubject.next(true);
    }
  }

  /**
   * Stop loading - decrement the counter and set loading to false when count reaches 0
   */
  stopLoading(): void {
    if (this.loadingCount > 0) {
      this.loadingCount--;
      if (this.loadingCount === 0) {
        this.loadingSubject.next(false);
      }
    }
  }

  /**
   * Force stop all loading operations
   */
  forceStopLoading(): void {
    this.loadingCount = 0;
    this.loadingSubject.next(false);
  }

  /**
   * Get the current number of active requests
   */
  get activeRequestCount(): number {
    return this.loadingCount;
  }
}
