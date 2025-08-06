import { TestBed } from '@angular/core/testing';
import { FieldErrorMessageComponent } from './field-error-message.component';
import { AbstractControl, FormControl, Validators } from '@angular/forms';
import { Injector, runInInjectionContext } from '@angular/core';


describe('FieldErrorMessageComponent', () => {
  let comp: FieldErrorMessageComponent;
  let injector: Injector;

  beforeEach(() => {
    // Creamos un injector vacío para poder usar runInInjectionContext
    TestBed.configureTestingModule({});
    injector = TestBed.inject(Injector);

    // Instanciamos el componente dentro de un contexto de inyeccion
    comp = runInInjectionContext(injector, () => new FieldErrorMessageComponent());
  });

  function setControl(ctrl: AbstractControl, messages?: Record<string,string>) {
    // Sobrescribimos la función control para que devuelva el AbstractControl que queramos
    (comp as any).control = () => ctrl;
    // Asignamos el input de mensajes personalizados
    comp.errorMessages = messages;
  }

  it('no errors → cadena vacía', () => {
    const ctrl = new FormControl('', []);
    setControl(ctrl);
    expect(comp.getErrorMessage()).toBe('');
  });

  it('required + touched → mensaje por defecto', () => {
    const ctrl = new FormControl('', [Validators.required]);
    ctrl.markAsTouched();
    setControl(ctrl);
    expect(comp.getErrorMessage()).toBe('Este campo es obligatorio.');
  });

  it('mensaje personalizado prioritario', () => {
    const ctrl = new FormControl('', [Validators.required, Validators.minLength(5)]);
    ctrl.markAsTouched();
    setControl(ctrl, { required: '¡Rellena esto ya!' });
    expect(comp.getErrorMessage()).toBe('¡Rellena esto ya!');
  });

  it('minlength → "Mínimo N caracteres"', () => {
    const ctrl = new FormControl('abc', [Validators.minLength(5)]);
    ctrl.markAsDirty();
    setControl(ctrl);
    expect(comp.getErrorMessage()).toBe('Mínimo 5 caracteres');
  });

  it('maxlength → "Máximo N caracteres"', () => {
    const ctrl = new FormControl('abcdef', [Validators.maxLength(5)]);
    ctrl.markAsTouched();
    setControl(ctrl);
    expect(comp.getErrorMessage()).toBe('Máximo 5 caracteres');
  });

  it('error desconocido → genérico', () => {
    const unknownValidator = () => ({ weird: true });
    const ctrl = new FormControl('', unknownValidator);
    ctrl.markAsTouched();
    setControl(ctrl);
    expect(comp.getErrorMessage()).toBe('Error en el campo');
  });
});
