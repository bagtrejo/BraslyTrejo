import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { parseLocalDate } from '../utils/parse-date-to-locale';

export function minDateValidator(minDate: Date): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;
    const minValue = new Date(minDate);

    let selectedDate: Date;

    // Si el valor es un string en formato YYYY-MM-DD, lo parseamos sin UTC
    if (typeof control.value === 'string' && control.value.includes('-')) {
        selectedDate = parseLocalDate(control.value);
    } else {
      selectedDate = new Date(control.value);
    }
    selectedDate.setHours(0, 0, 0, 0);
    minValue.setHours(0, 0, 0, 0);

    return selectedDate >= minValue
      ? null
      : { minDate: { requiredDate: minValue.toISOString().split('T')[0] } };
  };
}