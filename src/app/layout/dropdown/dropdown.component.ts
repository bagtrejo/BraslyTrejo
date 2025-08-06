import { ConnectedPosition, Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Component, ElementRef, input, output, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dropdown',
  imports: [FormsModule],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss'
})
export class DropdownComponent {
  options = input<{label: string, value: string}[]>([]);
  rowData =  input(); // datos de la fila para pasar al padre
  actionSelected =  output<{ action: string; row: any }>();

  @ViewChild('dropdownMenu') dropdownMenu!: TemplateRef<any>;
  @ViewChild('triggerBtn') triggerBtn!: ElementRef<HTMLButtonElement>;

  overlayRef!: OverlayRef;
  selectedLabel = '';
  isOpen = false;

  constructor(private overlay: Overlay, private viewContainerRef: ViewContainerRef) {}

  /** Posiciones posibles del overlay */
  positions: ConnectedPosition[] = [
    {
      originX: 'start',
      originY: 'bottom',
      overlayX: 'start',
      overlayY: 'top'
    },
    {
      originX: 'start',
      originY: 'top',
      overlayX: 'start',
      overlayY: 'bottom'
    }
  ];

  toggleMenu() {
    if (this.isOpen) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }

  openMenu() {
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.triggerBtn.nativeElement)
      .withPositions(this.positions)
      .withFlexibleDimensions(false)
      .withPush(false);

    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop'
    });

    this.overlayRef.attach(new TemplatePortal(this.dropdownMenu, this.viewContainerRef));
    this.overlayRef.backdropClick().subscribe(() => this.closeMenu());
    this.isOpen = true;
  }

  closeMenu() {
    this.overlayRef?.dispose();
    this.isOpen = false;
  }

  selectOption(opt: {label: string, value: string}, event: MouseEvent) {
    event.stopPropagation();
    this.selectedLabel = opt.label;
    this.actionSelected.emit({ action: opt.value, row: this.rowData });
    this.closeMenu();
  }
}
