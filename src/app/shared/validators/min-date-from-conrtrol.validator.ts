// shared/validators/min-date-from-control.validator.ts
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { parseLocalDate } from '../utils/parse-date-to-locale';
import { formatDate } from '../utils/format-date';

export function minDateFromControlValidator(otherControlName: string, yearsToAdd: number = 0): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.parent) return null;

    const otherControl = control.parent.get(otherControlName);
    if (!otherControl || !otherControl.value) return null;

    const baseDate = parseLocalDate(otherControl.value);
    const minDate = new Date(baseDate.getFullYear() + yearsToAdd, baseDate.getMonth(), baseDate.getDate());

    const currentDate = parseLocalDate(control.value);

    return currentDate >= minDate
      ? null
      : { minDateFromControl: { requiredDate: formatDate(minDate) } };
  };
}
