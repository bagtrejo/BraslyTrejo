import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormActionsProductComponent } from './form-actions-product.component';
import { By } from '@angular/platform-browser';

describe('FormActionsProductComponent', () => {
  let component: FormActionsProductComponent;
  let fixture: ComponentFixture<FormActionsProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormActionsProductComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(FormActionsProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit submit event when the "Enviar" button is clicked', () => {
    // Espiamos el emitter
    spyOn(component.submit, 'emit');

    // Buscamos el boton con la clase .button--submit
    const submitBtn =fixture.debugElement
      .query(By.css('button.button--submit'))
      .nativeElement as HTMLButtonElement;

    // Simulamos el click
    submitBtn.click();
    fixture.detectChanges();

    // Verificamos que emit() haya sido llamado
    expect(component.submit.emit).toHaveBeenCalled();
  });

  it('should emit reset event when the "Reiniciar" button is clicked', () => {
    spyOn(component.reset, 'emit');

    // Encontramos el boton cuyo texto es "Reiniciar"
    const resetBtn = fixture.debugElement
      .queryAll(By.css('button.button'))
      .find(btn => btn.nativeElement.textContent.trim() === 'Reiniciar')!
      .nativeElement as HTMLButtonElement;

    resetBtn.click();
    fixture.detectChanges();

    expect(component.reset.emit).toHaveBeenCalled();
  });

});
