import { TrimTextDirective } from './trim-text.directive';
import {ElementRef} from '@angular/core';

describe('TrimTextDirective', () => {
  let elementRef: ElementRef;
  let directive: TrimTextDirective;
  beforeEach(() => {
    elementRef = new ElementRef({
      value: 'initial value'
    });
    directive = new TrimTextDirective(elementRef);
  })
  it('should create an instance', () => {
    const directive = new TrimTextDirective(elementRef);
    expect(directive).toBeTruthy();
  });

  it('should remove spaces on input', () => {
    elementRef.nativeElement.value = '  test value  ';
    directive.onInput(new KeyboardEvent('input'));
    expect(elementRef.nativeElement.value).toBe('test value');
  });

  it('should remove spaces on blur', () => {
    elementRef.nativeElement.value = ' test value ';
    directive.onBlur(new KeyboardEvent('onblur'));
    expect(elementRef.nativeElement.value).toBe('test value');

  });

});
