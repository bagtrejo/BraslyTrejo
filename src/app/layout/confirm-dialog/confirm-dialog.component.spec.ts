import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDialogComponent } from './confirm-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('ConfirmDialogComponent', () => {
  let component: ConfirmDialogComponent;
  let fixture: ComponentFixture<ConfirmDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,     
        ConfirmDialogComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have default title and message signals', () => {
    expect(component.title()).toBe('Confirmación');
    expect(component.message()).toBe('¿Estás seguro?');
  });

  it('should emit true when onConfirm is called', () => {
    spyOn(component.confirmed, 'emit');
    component.onConfirm();
    expect(component.confirmed.emit).toHaveBeenCalledWith(true);
  });

  it('should emit false when onCancel is called', () => {
    spyOn(component.confirmed, 'emit');
    component.onCancel();
    expect(component.confirmed.emit).toHaveBeenCalledWith(false);
  });
});
