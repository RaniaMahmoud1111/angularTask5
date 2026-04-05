import { Directive, ElementRef, HostBinding, HostListener, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class Highlight implements OnChanges {

  // @Input('defualtColor') defColor='grey'
  // @Input('highlightColor') highColor='red'
  @Input() defualtColor = 'grey'
  @Input() highlightColor = 'red'

  constructor(private ele: ElementRef, private render2: Renderer2) {
    // ele.nativeElement.style.backgroundColor='#09c'
    console.log(ele.nativeElement);

  }

  ngOnChanges(): void {
    this.render2.setStyle(this.ele.nativeElement, 'background-color', this.defualtColor)
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.render2.setStyle(this.ele.nativeElement, 'background-color', this.highlightColor)
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.render2.setStyle(this.ele.nativeElement, 'background-color', this.defualtColor)
  }
}
