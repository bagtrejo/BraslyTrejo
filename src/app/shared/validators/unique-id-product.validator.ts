import { Inject } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, of, timer } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { IProductRepository} from '../interfaces/product-repository.interface';

export function uniqueIdValidator(productRepo: IProductRepository): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {

    // No validar si está vacío
    if (!control.value) return of(null); // No validar si está vacío

    // Espera 500ms antes de llamar al backend para evitar spam
    return timer(500).pipe(
      switchMap(() =>
        productRepo.checkProductId(control.value).pipe(
          map(exists => (exists ? { idNotUnique: true } : null)),
          catchError(() => of(null))
        )
      )
    );
  };
}