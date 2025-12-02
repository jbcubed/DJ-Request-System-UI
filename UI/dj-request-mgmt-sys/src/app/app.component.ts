import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DjSysHeaderComponent } from './dj-sys-header/dj-sys-header.component';
import { DjTextBoxComponent } from './shared/components/dj-text-box/dj-text-box.component';
import { DjTextAreaComponent } from './shared/components/dj-text-area/dj-text-area.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DjSysHeaderComponent, DjTextBoxComponent, DjTextAreaComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'dj-request-mgmt-sys';
  demoForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.demoForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.pattern(/^\(\d{3}\)\s\d{3}-\d{4}$/)]],
      search: [''],
      comments: ['', [Validators.maxLength(500)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
      notes: ['']
    });
  }

  getErrorMessage(controlName: string): string {
    const control = this.demoForm.get(controlName);
    
    if (control && control.errors && control.touched) {
      if (control.errors['required']) {
        return `${this.getFieldDisplayName(controlName)} is required.`;
      }
      if (control.errors['email']) {
        return 'Please enter a valid email address.';
      }
      if (control.errors['minlength']) {
        return `${this.getFieldDisplayName(controlName)} must be at least ${control.errors['minlength'].requiredLength} characters.`;
      }
      if (control.errors['pattern']) {
        return 'Please enter a valid phone number in format: (XXX) XXX-XXXX';
      }
      if (control.errors['maxlength']) {
        return `${this.getFieldDisplayName(controlName)} must not exceed ${control.errors['maxlength'].requiredLength} characters.`;
      }
    }
    
    return '';
  }

  private getFieldDisplayName(controlName: string): string {
    const fieldNames: { [key: string]: string } = {
      firstName: 'First Name',
      email: 'Email Address',
      phone: 'Phone Number',
      search: 'Search',
      comments: 'Comments',
      description: 'Description',
      notes: 'Notes'
    };
    
    return fieldNames[controlName] || controlName;
  }

  onSubmit(): void {
    if (this.demoForm.valid) {
      console.log('Form Submitted:', this.demoForm.value);
      alert('Form submitted successfully! Check the console for values.');
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.demoForm.controls).forEach(key => {
        this.demoForm.get(key)?.markAsTouched();
      });
    }
  }

  resetForm(): void {
    this.demoForm.reset();
  }
}
