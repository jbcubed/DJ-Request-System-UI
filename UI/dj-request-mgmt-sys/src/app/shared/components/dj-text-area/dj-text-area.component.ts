// Copilot: Enterprise Angular, security-first, accessible-by-default, no tutorials.
import { Component, Input, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ErrorSummaryService } from '../error-summary/error-summary.service';
import { DjFormError } from '../../interfaces';

export type TextAreaLabelPosition = 'above' | 'left';
export type ResizeMode = 'none' | 'vertical' | 'horizontal' | 'both';

@Component({
  selector: 'app-dj-text-area',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dj-text-area.component.html',
  styleUrl: './dj-text-area.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DjTextAreaComponent),
      multi: true
    }
  ]
})
export class DjTextAreaComponent implements ControlValueAccessor, OnInit {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() showLabel: boolean = true;
  @Input() labelPosition: TextAreaLabelPosition = 'above';
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;
  @Input() rows: number = 4;
  @Input() cols: number | null = null;
  @Input() maxLength: number | null = null;
  @Input() minLength: number | null = null;
  @Input() resize: ResizeMode = 'vertical';
  @Input() autoGrow: boolean = false;
  @Input() maxRows: number = 10;
  @Input() minRows: number = 2;
  @Input() errorMessage: string = '';
  @Input() helpText: string = '';
  @Input() id: string = '';
  @Input() name: string = '';
  @Input() ariaLabel: string = '';
  @Input() ariaDescribedBy: string = '';
  @Input() showCharacterCount: boolean = false;
  @Input() wrap: 'soft' | 'hard' | 'off' = 'soft';
  @Input() errorSummaryName: string = '';
  @Input() instructions: string = '';

  // Internal properties
  value: string = '';
  uniqueId: string = '';
  helpTextId: string = '';
  errorId: string = '';
  charCountId: string = '';
  isTouched: boolean = false;
  isFocused: boolean = false;
  currentRows: number = 4;
  private lastErrorState = false;

  private onChange = (value: string) => {};
  private onTouched = () => {};

  constructor(private errorSummaryService: ErrorSummaryService) {}

  ngOnInit(): void {
    // Generate unique IDs if not provided
    if (!this.id) {
      this.uniqueId = `dj-textarea-${Math.random().toString(36).substr(2, 9)}`;
    } else {
      this.uniqueId = this.id;
    }
    
    this.helpTextId = `${this.uniqueId}-help`;
    this.errorId = `${this.uniqueId}-error`;
    this.charCountId = `${this.uniqueId}-charcount`;
    this.currentRows = Math.max(this.rows, this.minRows);
  }

  // ControlValueAccessor implementation
  writeValue(value: string): void {
    this.value = value || '';
    if (this.autoGrow) {
      this.adjustHeight();
    }
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  // Event handlers
  onInput(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    this.value = target.value;
    this.onChange(this.value);
    
    if (this.autoGrow) {
      this.adjustHeight();
    }
  }

  onBlur(): void {
    this.isTouched = true;
    this.isFocused = false;
    this.onTouched();
    
    // Delay error summary update to allow parent change detection to run
    setTimeout(() => {
      this.updateErrorSummary();
    }, 0);
  }

  onFocus(): void {
    this.isFocused = true;
  }

  // Auto-grow functionality
  private adjustHeight(): void {
    if (!this.autoGrow) return;
    
    const lineCount = this.value.split('\n').length;
    const calculatedRows = Math.max(
      this.minRows,
      Math.min(lineCount + 1, this.maxRows)
    );
    
    this.currentRows = calculatedRows;
  }

  // Computed properties
  get hasError(): boolean {
    return !!this.errorMessage && this.isTouched;
  }

  get characterCount(): number {
    return this.value.length;
  }

  get remainingCharacters(): number {
    return this.maxLength ? this.maxLength - this.characterCount : 0;
  }

  get isNearCharacterLimit(): boolean {
    if (!this.maxLength) return false;
    return this.remainingCharacters <= 20;
  }

  get isOverCharacterLimit(): boolean {
    if (!this.maxLength) return false;
    return this.characterCount > this.maxLength;
  }

  get textareaClasses(): string {
    let classes = 'form-control dj-textarea-input';
    
    if (this.hasError) {
      classes += ' is-invalid';
    }
    
    if (this.isFocused) {
      classes += ' focused';
    }
    
    if (this.autoGrow) {
      classes += ' auto-grow';
    }
    
    return classes;
  }

  get containerClasses(): string {
    let classes = 'dj-textarea-container';
    
    if (this.labelPosition === 'left') {
      classes += ' label-left';
    } else {
      classes += ' label-above';
    }
    
    if (this.disabled) {
      classes += ' disabled';
    }
    
    return classes;
  }

  get describedBy(): string {
    const descriptors: string[] = [];
    
    if (this.helpText) {
      descriptors.push(this.helpTextId);
    }
    
    if (this.hasError) {
      descriptors.push(this.errorId);
    }
    
    if (this.showCharacterCount) {
      descriptors.push(this.charCountId);
    }
    
    if (this.ariaDescribedBy) {
      descriptors.push(this.ariaDescribedBy);
    }
    
    return descriptors.join(' ');
  }

  get effectiveAriaLabel(): string {
    return this.ariaLabel || this.label || this.placeholder;
  }

  /**
   * Update error summary when validation state changes
   */
  private updateErrorSummary(): void {
    if (!this.errorSummaryName) {
      return;
    }

    const currentErrorState = this.hasError;
    
    // If error state changed
    if (currentErrorState !== this.lastErrorState) {
      if (currentErrorState && this.errorMessage) {
        // Add error to summary
        const error: DjFormError = {
          id: `${this.uniqueId}-error`,
          htmlId: this.uniqueId,
          description: this.errorMessage,
          summaryName: this.errorSummaryName,
          instructions: this.instructions
        };
        this.errorSummaryService.addError(error);
      } else {
        // Remove error from summary
        this.errorSummaryService.removeError(`${this.uniqueId}-error`, this.errorSummaryName);
      }
      
      this.lastErrorState = currentErrorState;
    }
  }

  get textareaStyles(): { [key: string]: string } {
    const styles: { [key: string]: string } = {};
    
    if (this.resize !== 'both') {
      styles['resize'] = this.resize;
    }
    
    return styles;
  }
}
