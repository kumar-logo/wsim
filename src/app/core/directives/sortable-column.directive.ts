import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appSortableColumn]',
  standalone: true
})
export class SortableColumnDirective {
  @Input('appSortableColumn') columnKey!: string;
  @Output() sort = new EventEmitter<{ column: string; direction: 'asc' | 'desc' }>();

  private direction: 'asc' | 'desc' = 'asc';

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.renderer.setStyle(this.el.nativeElement, 'cursor', 'pointer');
    this.renderer.addClass(this.el.nativeElement, 'select-none');
  }

  @HostListener('click') onClick() {
    this.direction = this.direction === 'asc' ? 'desc' : 'asc';
    this.sort.emit({ column: this.columnKey, direction: this.direction });
  }
}
