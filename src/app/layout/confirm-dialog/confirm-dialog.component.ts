import { Component, input, OnInit, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { isInvalidField } from '../../shared/utils/invalid-field-form';

@Component({
  selector: 'app-confirm-dialog',
  imports: [ReactiveFormsModule],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss'
})
export class ConfirmDialogComponent{
  title =  input<string>('Confirmación');
  message = input<string>('¿Estás seguro?');
  confirmed = output<boolean>();

  form!: FormGroup;
  
  constructor(private formBuilder: FormBuilder) {}

  onConfirm() {
    this.confirmed.emit(true);
  }

  onCancel() {
    this.confirmed.emit(false);
  }
}
