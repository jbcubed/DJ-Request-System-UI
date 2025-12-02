# DjTextArea Component

A comprehensive, accessible textarea component for Angular reactive forms with Bootstrap 5 styling and advanced features like auto-growing, character counting, and flexible resize options.

## Features

- ✅ **Reactive Forms Compatible**: Implements `ControlValueAccessor` for seamless integration
- ✅ **WCAG Accessibility**: Full compliance with WCAG 2.1 guidelines  
- ✅ **Auto-Growing**: Optional auto-resize based on content
- ✅ **Character Counting**: Built-in character counter with limit warnings
- ✅ **Flexible Resizing**: Control resize behavior (none, vertical, horizontal, both)
- ✅ **Responsive Design**: Works perfectly on mobile and desktop
- ✅ **Label Positioning**: Labels above or to the left of the textarea
- ✅ **Validation Support**: Visual feedback with customizable error messages

## Basic Usage

```typescript
import { DjTextAreaComponent } from './shared/components/dj-text-area/dj-text-area.component';

export class MyComponent {
  myForm = this.fb.group({
    description: ['', [Validators.required, Validators.maxLength(1000)]]
  });
}
```

```html
<form [formGroup]="myForm">
  <app-dj-text-area
    label="Description"
    formControlName="description"
    placeholder="Enter description..."
    [required]="true"
    [maxLength]="1000"
    [showCharacterCount]="true">
  </app-dj-text-area>
</form>
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `label` | `string` | `''` | Text label for the textarea |
| `placeholder` | `string` | `''` | Placeholder text |
| `showLabel` | `boolean` | `true` | Whether to display the label |
| `labelPosition` | `'above' \\| 'left'` | `'above'` | Label position |
| `required` | `boolean` | `false` | Whether the field is required |
| `disabled` | `boolean` | `false` | Whether the textarea is disabled |
| `readonly` | `boolean` | `false` | Whether the textarea is read-only |
| `rows` | `number` | `4` | Number of visible text lines |
| `cols` | `number \\| null` | `null` | Width in characters |
| `maxLength` | `number \\| null` | `null` | Maximum character limit |
| `minLength` | `number \\| null` | `null` | Minimum character requirement |
| `resize` | `ResizeMode` | `'vertical'` | Resize behavior |
| `autoGrow` | `boolean` | `false` | Enable auto-growing height |
| `maxRows` | `number` | `10` | Maximum rows when auto-growing |
| `minRows` | `number` | `2` | Minimum rows when auto-growing |
| `showCharacterCount` | `boolean` | `false` | Show character counter |
| `wrap` | `'soft' \\| 'hard' \\| 'off'` | `'soft'` | Text wrapping behavior |

## Advanced Features

### Auto-Growing Textarea

```html
<app-dj-text-area
  label="Comments"
  formControlName="comments"
  [autoGrow]="true"
  [minRows]="3"
  [maxRows]="10"
  placeholder="Type here and watch it grow...">
</app-dj-text-area>
```

### Character Counter with Limits

```html
<app-dj-text-area
  label="Message"
  formControlName="message"
  [maxLength]="500"
  [showCharacterCount]="true"
  placeholder="Enter your message...">
</app-dj-text-area>
```

### Custom Resize Behavior

```html
<!-- No resize -->
<app-dj-text-area resize="none" />

<!-- Only vertical resize -->
<app-dj-text-area resize="vertical" />

<!-- Both directions -->
<app-dj-text-area resize="both" />
```

## Accessibility Features

- **Proper Labeling**: Labels correctly associated with textareas
- **ARIA Support**: Comprehensive ARIA attributes for screen readers
- **Character Count Announcements**: Real-time character count updates
- **Error Handling**: Error messages announced with `role="alert"`
- **Keyboard Navigation**: Full keyboard accessibility
- **Focus Management**: Clear focus indicators

## Styling & Theming

Uses Bootstrap 5 classes with custom CSS for enhanced functionality:

```css
/* Custom styling example */
.dj-textarea-input {
  font-family: 'Monaco', 'Menlo', monospace; /* For code input */
}

.dj-textarea-char-count.near-limit {
  color: #your-warning-color;
}
```

## Examples

### Basic Comment Field
```html
<app-dj-text-area
  label="Comments"
  formControlName="comments"
  placeholder="Enter your comments..."
  [rows]="4">
</app-dj-text-area>
```

### Rich Description Field
```html
<app-dj-text-area
  label="Event Description"
  formControlName="description"
  [required]="true"
  [autoGrow]="true"
  [maxLength]="1000"
  [showCharacterCount]="true"
  helpText="Describe your event in detail"
  [errorMessage]="getErrorMessage('description')">
</app-dj-text-area>
```

### Code Input Field
```html
<app-dj-text-area
  label="Custom CSS"
  formControlName="customCss"
  [rows]="10"
  resize="both"
  wrap="off"
  placeholder="/* Enter custom CSS here */">
</app-dj-text-area>
```