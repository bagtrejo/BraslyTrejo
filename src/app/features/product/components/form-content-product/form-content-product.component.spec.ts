import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { FormContentProductComponent } from './form-content-product.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FieldErrorMessageComponent } from '../../../../shared/components/field-error-message/field-error-message.component';
import { FormActionsProductComponent } from '../form-actions-product/form-actions-product.component';
import { ActivatedRoute } from '@angular/router';

describe('FormContentProductComponent', () => {
  let component: FormContentProductComponent;
  let fixture: ComponentFixture<FormContentProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FieldErrorMessageComponent,
        FormActionsProductComponent,
        FormContentProductComponent   // standalone
      ],
      providers: [
        { provide: ActivatedRoute, useValue: {} }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FormContentProductComponent);
    component = fixture.componentInstance;
  });

  it('should create the component and build the form', () => {
    component.ngOnInit();
    expect(component.form).toBeDefined();
    const controls = component.form.controls;
    ['id','name','description','logo','date_release','date_revision']
      .forEach(key => expect(controls[key]).toBeDefined());
    // el control id empieza habilitado
    expect(controls['id'].enabled).toBeTrue();
  });

  it('should reset form fields on handleResetFields()', () => {
    component.ngOnInit();
    const nameCtrl = component.form.get('name')!;
    nameCtrl.setValue('XYZ');
    expect(nameCtrl.value).toBe('XYZ');
  
    component.handleResetFields();
  
    expect(nameCtrl.value).toBeNull();
  });

  it('should mark all fields touched when onSubmit() is invalid', () => {
    component.ngOnInit();
    spyOn(component.form, 'markAllAsTouched');
    spyOn(component.save, 'emit');
    spyOn(component.update, 'emit');

    // sin datos - invalido
    component.onSubmit();

    expect(component.form.markAllAsTouched).toHaveBeenCalled();
    expect(component.save.emit).not.toHaveBeenCalled();
    expect(component.update.emit).not.toHaveBeenCalled();
  });

  it('should emit save event and reset form when onSubmit() is valid (crear)', () => {
    component.ngOnInit();
    const f = component.form;

    // rellenamos valores que pasan validadores sincronos
    f.get('id')!.setValue('ABC123');
    f.get('name')!.setValue('Valid Name');
    f.get('description')!.setValue('Valid desc!');
    f.get('logo')!.setValue('url.png');
    const now = new Date();
    f.get('date_release')!.setValue(now);
    f.get('date_revision')!.setValue(new Date(now.getFullYear()+1, now.getMonth(), now.getDate()));

    // Quitamos el async-validator para que form.valid sea true sin llamadas externas
    const idCtrl = f.get('id')!;
    idCtrl.clearAsyncValidators();
    idCtrl.updateValueAndValidity();

    spyOn(component.save, 'emit');
    spyOn(f, 'reset');

    component.onSubmit();

    expect(component.save.emit).toHaveBeenCalledWith(f.value);
    expect(f.reset).toHaveBeenCalled();
  });

  it('should patch values and emit update in edit mode', () => {
    // preparamos productToEdit como señal
    const product = {
      id: 'ABC123',                         
      name: 'Valid Name',                  
      description: 'Valid description',   
      logo: 'logo.png',
      date_release: new Date(2020,1,1),
      date_revision: new Date(2021,1,1)
    } as any;

    (component as any).productToEdit = () => product;

    component.ngOnInit();
    fixture.detectChanges();

    const f = component.form;

    // tras patchValue, el control id debe quedar disabled
    expect(f.get('id')!.disabled).toBeTrue();

    // QUITAMOS LOS VALIDADORES DE FECHA PARA QUE form.valid SEA TRUE:
    const dr = f.get('date_release')!;
    dr.clearValidators();
    dr.updateValueAndValidity();
    const dv = f.get('date_revision')!;
    dv.clearValidators();
    dv.updateValueAndValidity();
  
    // Tambien quitamos el async-validator del id
    const idCtrl = f.get('id')!;
    idCtrl.clearAsyncValidators();
    idCtrl.updateValueAndValidity();

    spyOn(component.update, 'emit');
    spyOn(f, 'reset');

    component.onSubmit();

    expect(component.update.emit).toHaveBeenCalledWith(f.value);
    expect(f.reset).toHaveBeenCalled();
  });
});
