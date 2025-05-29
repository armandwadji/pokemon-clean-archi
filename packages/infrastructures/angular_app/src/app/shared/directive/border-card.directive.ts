import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[appPokemonBorderCard]',
  standalone: true,
})
export class BorderCardDirective {
  private initialColor = '#f5f5f5';
  private defaultColor = '#009688';
  private defaultHeight = 180;

  constructor(private el: ElementRef) {
    this.setBorder(this.initialColor);
    this.setHeight(this.defaultHeight);
  }

  @Input() borderColor: string | undefined;

  @HostListener('mouseenter') onMouseEnter() {
    this.setBorder(this.borderColor || this.defaultColor);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.setBorder('#f5f5f5');
  }

  private setHeight(height: number) {
    this.el.nativeElement.style.height = `${height}px`;
    this.el.nativeElement.style.cursor = `pointer`;
  }

  private setBorder(color: string) {
    this.el.nativeElement.style.border = `solid 4px ${color}`;
  }
}
