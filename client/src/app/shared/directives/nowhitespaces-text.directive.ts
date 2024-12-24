import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[appNowhitespacesText]'
})
export class NowhitespacesTextDirective {

  constructor(private el :ElementRef) { }

  @HostListener('input', ['$event'])
  onInput(event: KeyboardEvent) {
    this.removeWhiteSpaces();
  }


  private removeWhiteSpaces() {
    this.el.nativeElement.value = this.el.nativeElement.value.replace(/ /g, '');
  }


}
