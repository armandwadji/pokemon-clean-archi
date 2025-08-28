import { BorderCardDirective } from './border-card.directive';
import { ElementRef } from '@angular/core';

describe('BorderCardDirective', () => {
  let directive: BorderCardDirective;
  let mockElementRef: ElementRef;

  beforeEach(() => {
    mockElementRef = {
      nativeElement: {
        style: {
          border: '',
          height: '',
          cursor: '',
        },
      },
    } as ElementRef;
    directive = new BorderCardDirective(mockElementRef);
  });

  it('applies initial border color and height on creation', () => {
    expect(mockElementRef.nativeElement.style.border).toBe('solid 4px #f5f5f5');
    expect(mockElementRef.nativeElement.style.height).toBe('180px');
    expect(mockElementRef.nativeElement.style.cursor).toBe('pointer');
  });

  it('applies default border color on mouse enter if no borderColor is provided', () => {
    directive.onMouseEnter();
    expect(mockElementRef.nativeElement.style.border).toBe('solid 4px #009688');
  });

  it('applies custom border color on mouse enter if borderColor is provided', () => {
    directive.borderColor = '#ff0000';
    directive.onMouseEnter();
    expect(mockElementRef.nativeElement.style.border).toBe('solid 4px #ff0000');
  });

  it('resets border color to initial color on mouse leave', () => {
    directive.onMouseLeave();
    expect(mockElementRef.nativeElement.style.border).toBe('solid 4px #f5f5f5');
  });

  it('handles undefined borderColor gracefully on mouse enter', () => {
    directive.borderColor = undefined;
    directive.onMouseEnter();
    expect(mockElementRef.nativeElement.style.border).toBe('solid 4px #009688');
  });
});
