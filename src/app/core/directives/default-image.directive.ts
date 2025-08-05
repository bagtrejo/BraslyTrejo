import { Directive, HostListener, input } from '@angular/core';

@Directive({
  selector: '[appDefaultImage]'
})
export class DefaultImageDirective {

  appDefaultImage = input('');

  @HostListener('error', ['$event.target'])
  onError(img: HTMLImageElement) {
    img.src = this.appDefaultImage() || 'assets/images/default.png';
  }

}
