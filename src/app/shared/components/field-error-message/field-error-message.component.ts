import { Component, Input, input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-field-error-message',
  imports: [],
  template: `
    @if(control()?.errors && (control()?.dirty || control()?.touched)){
      <small class="error-message">
        {{ getErrorMessage() }}
      </small>
    }
  `,
  styleUrl: './field-error-message.component.scss'
})
export class FieldErrorMessageComponent {
  control = input<AbstractControl | undefined>();
  @Input() errorMessages?: { [key: string]: string };

  getErrorMessage() {
    const errors = this.control()?.errors;
    if (!errors) return '';

    // Prioriza mensajes personalizados si están disponibles.
    for (const errorKey of Object.keys(errors)) {
      if (this.errorMessages && this.errorMessages[errorKey]) {
        return this.errorMessages[errorKey];
      }
    }

    // Mensajes de error por defecto.
    if (errors['required']) return 'Este campo es obligatorio.';
    if (errors['minlength'])
      return `Mínimo ${errors['minlength'].requiredLength} caracteres`;
    if (errors['maxlength'])
      return `Máximo ${errors['maxlength'].requiredLength} caracteres`;
    // ... añadir más casos según sea necesario

    return 'Error en el campo';
  }
}
