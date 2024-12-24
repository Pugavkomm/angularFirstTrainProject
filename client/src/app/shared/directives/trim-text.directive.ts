import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[appTrimText]'
})
export class TrimTextDirective {

  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event'])
  onInput(event: KeyboardEvent) {
    this.trimText();
  }

  @HostListener('blur', ['$event'])
  onBlur(event: KeyboardEvent) {
    this.trimText()
  }


  private trimText() {
    this.el.nativeElement.value = this.el.nativeElement.value.trim();
  }
}
