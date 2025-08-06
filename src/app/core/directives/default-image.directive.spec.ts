import { Injector, runInInjectionContext } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { DefaultImageDirective } from './default-image.directive';

describe('DefaultImageDirective (unit)', () => {
  let directive: DefaultImageDirective;
  let injector: Injector;

  beforeEach(() => {
    // Preparamos un Injector vacío para runInInjectionContext
    TestBed.configureTestingModule({});
    injector = TestBed.inject(Injector);

    // Instanciamos la directiva DENTRO del contexto de inyección
    directive = runInInjectionContext(injector, () => new DefaultImageDirective());
  });

  it('should use the provided fallback URL when appDefaultImage returns it', () => {
    const img = document.createElement('img');
    // Sobrescribimos el input signal para que devuelva nuestra URL
    ;(directive as any).appDefaultImage = () => 'http://example.com/fb.png';

    directive.onError(img);

    // El src del <img> cambia a la URL de fallback
    expect(img.src).toContain('example.com/fb.png');
  });

  it('should fall back to the default.png when no fallback is provided', () => {
    const img = document.createElement('img');
    // appDefaultImage() devuelve undefined
    ;(directive as any).appDefaultImage = () => undefined;

    directive.onError(img);

    // Ahora debe usar el fallback interno
    expect(img.src).toContain('assets/images/default.png');
  });
});
