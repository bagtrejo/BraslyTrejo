import { FormGroup } from "@angular/forms";

export const isInvalidField = (form: FormGroup, fieldName: string): boolean => {
    const control = form.get(fieldName);
    return !!(control?.invalid && (control?.touched || control?.dirty));
  }