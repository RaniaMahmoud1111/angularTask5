import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appDisableAfterClick]'
})
export class DisableAfterClick {

  constructor(private el: ElementRef) { }

  @HostListener('click') onClick() {
    this.el.nativeElement.disabled = true;
  }

}