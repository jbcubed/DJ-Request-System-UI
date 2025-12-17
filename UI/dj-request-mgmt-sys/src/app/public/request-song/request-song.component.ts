import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UIManagedComponent } from '../../shared/AbstractClasses/UIDataManagedComponet';
import { getEventDto } from '../../shared/interfaces/getEventDto';
import { getEventRequestDto } from '../../shared/interfaces/getRequestDto';
import { CreateSongRequestDto } from '../../shared/interfaces/createSongRequestDto';
import { SongRequestService } from './song-request.service';
import { DjTextBoxComponent, DjTextAreaComponent } from '../../shared/components';
import { ErrorSummaryComponent } from '../../shared/components/error-summary/error-summary.component';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-request-song',
  imports: [CommonModule, ReactiveFormsModule, DjTextBoxComponent, DjTextAreaComponent, ErrorSummaryComponent],
  templateUrl: './request-song.component.html',
  styleUrl: './request-song.component.css'
})
export class RequestSongComponent extends UIManagedComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly formBuilder = inject(FormBuilder);
  private readonly songRequestService = inject(SongRequestService);
  
  // Enterprise-standard properties for storing resolved data
  protected event: getEventDto | null = null;
  protected requests: getEventRequestDto[] | null = null;
  protected eventPublicId: string | null = null;
  
  // Form properties
  protected songRequestForm: FormGroup;
  protected isSubmitting = false;
  protected submitError: string | null = null;
  protected readonly errorSummaryName = 'song-request-form';

  constructor() {
    super();
    this.songRequestForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      description: ['', [Validators.maxLength(500)]]
    });
  }

  override initializeUI(): void {
    this.loadResolverData();
    this.extractEventPublicId();
  }

  /**
   * Loads data from route resolvers following enterprise practices
   * - Uses safe navigation and null checks
   * - Handles potential undefined values gracefully
   * - Stores data in protected properties for component use
   */
  private loadResolverData(): void {
    const resolvedData = this.route.snapshot.data;
    
    this.event = resolvedData['event'] as getEventDto || null;
    this.requests = resolvedData['requests'] as getEventRequestDto[] || null;
    
    // Environment-controlled debug logging
    if (environment.enableDebugLogs) {
      if (this.event) {
        console.log('Event data loaded:', this.event);
      }
      if (this.requests) {
        console.log('Requests data loaded:', this.requests);
      }
    }
  }

  /**
   * Extracts the event public ID from the URL parameters
   * - Uses Angular's ActivatedRoute for parameter access
   * - Implements null safety checks
   * - Stores in protected property for component access
   */
  private extractEventPublicId(): void {
    this.eventPublicId = this.route.snapshot.paramMap.get('id');
    
    if (environment.enableDebugLogs) {
      if (this.eventPublicId) {
        console.log('Event Public ID extracted:', this.eventPublicId);
      } else {
        console.warn('No event public ID found in route parameters');
      }
    }
  }

  /**
   * Handles form submission for creating a new song request
   * - Validates form data
   * - Calls service to create request
   * - Handles success and error scenarios
   */
  protected onSubmitSongRequest(): void {
    if (this.songRequestForm.invalid || !this.eventPublicId) {
      this.markFormGroupTouched();
      return;
    }

    this.isSubmitting = true;
    this.submitError = null;

    const formValue = this.songRequestForm.value;
    const requestData: CreateSongRequestDto = {
      name: formValue.name.trim(),
      description: formValue.description?.trim() || undefined,
      eventPublicId: this.eventPublicId
    };

    this.songRequestService.createSongRequest(requestData).subscribe({
      next: (newRequest) => {
        if (environment.enableDebugLogs) {
          console.log('Song request created successfully:', newRequest);
        }
        
        // Add new request to the list
        if (this.requests) {
          this.requests.unshift(newRequest);
        } else {
          this.requests = [newRequest];
        }
        
        // Reset form
        this.songRequestForm.reset();
        this.isSubmitting = false;
      },
      error: (error) => {
        if (environment.enableDebugLogs) {
          console.error('Error creating song request:', error);
        }
        
        this.submitError = 'Failed to submit song request. Please try again.';
        this.isSubmitting = false;
      }
    });
  }

  /**
   * Marks all form controls as touched to trigger validation display
   */
  private markFormGroupTouched(): void {
    Object.keys(this.songRequestForm.controls).forEach(key => {
      this.songRequestForm.get(key)?.markAsTouched();
    });
  }

  /**
   * Gets validation error message for a form control
   */
  protected getFieldError(fieldName: string): string | null {
    const control = this.songRequestForm.get(fieldName);
    
    if (!control || !control.touched || !control.errors) {
      return null;
    }

    if (control.errors['required']) {
      return `${fieldName === 'name' ? 'Song name' : 'Description'} is required.`;
    }
    
    if (control.errors['minlength']) {
      return `${fieldName === 'name' ? 'Song name' : 'Description'} must be at least ${control.errors['minlength'].requiredLength} characters.`;
    }
    
    if (control.errors['maxlength']) {
      return `${fieldName === 'name' ? 'Song name' : 'Description'} must not exceed ${control.errors['maxlength'].requiredLength} characters.`;
    }

    return null;
  }

  /**
   * Placeholder method for upvote functionality
   */
  protected onUpvoteRequest(request: getEventRequestDto): void {
    if (environment.enableDebugLogs) {
      console.log('Upvote clicked for request:', request.id);
    }
    // TODO: Implement upvote functionality
  }
}
