import { Component, Input, forwardRef, OnInit, OnDestroy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';

export type LabelPosition = 'above' | 'left';
export type TextBoxType = 'text' | 'email' | 'password' | 'tel' | 'url' | 'search';

@Component({
  selector: 'app-dj-text-box',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dj-text-box.component.html',
  styleUrl: './dj-text-box.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DjTextBoxComponent),
      multi: true
    }
  ]
})
export class DjTextBoxComponent implements ControlValueAccessor, OnInit, OnDestroy {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() showLabel: boolean = true;
  @Input() labelPosition: LabelPosition = 'above';
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;
  @Input() type: TextBoxType = 'text';
  @Input() maxLength: number | null = null;
  @Input() minLength: number | null = null;
  @Input() pattern: string | null = null;
  @Input() errorMessage: string = '';
  @Input() helpText: string = '';
  @Input() id: string = '';
  @Input() name: string = '';
  @Input() autocomplete: string = '';
  @Input() ariaLabel: string = '';
  @Input() ariaDescribedBy: string = '';

  // Internal properties
  value: string = '';
  uniqueId: string = '';
  helpTextId: string = '';
  errorId: string = '';
  isTouched: boolean = false;
  isFocused: boolean = false;

  private destroy$ = new Subject<void>();
  private onChange = (value: string) => {};
  private onTouched = () => {};

  ngOnInit(): void {
    // Generate unique IDs if not provided
    if (!this.id) {
      this.uniqueId = `dj-textbox-${Math.random().toString(36).substr(2, 9)}`;
    } else {
      this.uniqueId = this.id;
    }
    
    this.helpTextId = `${this.uniqueId}-help`;
    this.errorId = `${this.uniqueId}-error`;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // ControlValueAccessor implementation
  writeValue(value: string): void {
    this.value = value || '';
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
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.onChange(this.value);
  }

  onBlur(): void {
    this.isTouched = true;
    this.isFocused = false;
    this.onTouched();
  }

  onFocus(): void {
    this.isFocused = true;
  }

  // Computed properties
  get hasError(): boolean {
    return !!this.errorMessage && this.isTouched;
  }

  get inputClasses(): string {
    let classes = 'form-control dj-textbox-input';
    
    if (this.hasError) {
      classes += ' is-invalid';
    }
    
    if (this.isFocused) {
      classes += ' focused';
    }
    
    return classes;
  }

  get containerClasses(): string {
    let classes = 'dj-textbox-container';
    
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
    
    if (this.ariaDescribedBy) {
      descriptors.push(this.ariaDescribedBy);
    }
    
    return descriptors.join(' ');
  }

  get effectiveAriaLabel(): string {
    return this.ariaLabel || this.label || this.placeholder;
  }
}
