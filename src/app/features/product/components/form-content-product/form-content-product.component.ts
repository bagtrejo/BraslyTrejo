import { Component, input, OnInit, output, signal } from '@angular/core';
import { FieldErrorMessageComponent } from '../../../../shared/components/field-error-message/field-error-message.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { uniqueIdValidator } from '../../../../shared/validators/unique-id-product.validator';
import { minDateValidator } from '../../../../shared/validators/min-date.validator';
import { minDateFromControlValidator } from '../../../../shared/validators/min-date-from-conrtrol.validator';
import { IProductRepository } from '../../../../shared/interfaces/product-repository.interface';
import { FormActionsProductComponent } from '../form-actions-product/form-actions-product.component';
import { isInvalidField } from '../../../../shared/utils/invalid-field-form';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '../../../../shared/interfaces/product.interface';

@Component({
  selector: 'app-form-content-product',
  imports: [ReactiveFormsModule, FieldErrorMessageComponent, FormActionsProductComponent],
  templateUrl: './form-content-product.component.html',
  styleUrl: './form-content-product.component.scss'
})
export class FormContentProductComponent implements OnInit{
  save = output<void>();
  update = output<void>();
  productRepo = input<IProductRepository>();
  productToEdit = input<IProduct | undefined>();
  editMode = signal<boolean>(false);

  form!: FormGroup;

  constructor(private readonly formBuilder: FormBuilder, private activatedRoute: ActivatedRoute){}
  ngOnInit(): void {
    this.buildForm()

    if(this.productToEdit()){
      this.form.patchValue(this.productToEdit() as any)
      this.form.get('id')?.disable();
    }
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      id: new FormControl<string | null>('', {
        validators: [Validators.required, Validators.maxLength(10), Validators.minLength(3)],
        asyncValidators: [uniqueIdValidator(this.productRepo()!)]
      }),
      name: new FormControl<string>('', {
        validators: [Validators.required, Validators.maxLength(100), Validators.minLength(5)]
      }),
      description: new FormControl<string>('', {
        validators: [Validators.required, Validators.maxLength(200), Validators.minLength(10)]
      }),
      logo: new FormControl<string>('', {
        validators: [Validators.required]
      }),
      date_release: new FormControl<Date | null>(null, {
        validators: [Validators.required, minDateValidator(new Date())], // fecha mayor o igual a la fecha actual
      }),
      date_revision: new FormControl<Date | null>(null, {
        validators: [Validators.required, minDateFromControlValidator('date_release', 1)] // fecha un anio posterior a dateRelease
      }),
    });
  }

  handleResetFields(){
    this.form.reset();
  }

  onSubmit(){
    if(this.form.valid) {
      this.handleUpSert();
      this.handleResetFields();
    }else {
      this.form.markAllAsTouched();
    }
  } 

  handleUpSert(){
    if(this.productToEdit()){
      this.update.emit(this.form.value)
    }else {
      this.save.emit(this.form.value);
    }
  }

  fieldInvalid(fieldName: string): boolean {
    return isInvalidField(this.form, fieldName)
  }
  
}
