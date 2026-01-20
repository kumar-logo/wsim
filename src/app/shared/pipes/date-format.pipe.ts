import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat',
  standalone: true
})
export class DateFormatPipe implements PipeTransform {
  transform(value: Date | string | null | undefined, format: string = 'medium'): string {
    if (!value) return '-';
    
    const date = typeof value === 'string' ? new Date(value) : value;
    
    const options: Intl.DateTimeFormatOptions = {};
    
    switch (format) {
      case 'short':
        options.month = 'numeric';
        options.day = 'numeric';
        options.year = '2-digit';
        break;
      case 'medium':
        options.month = 'short';
        options.day = 'numeric';
        options.year = 'numeric';
        break;
      case 'long':
        options.month = 'long';
        options.day = 'numeric';
        options.year = 'numeric';
        break;
      case 'full':
        options.weekday = 'long';
        options.month = 'long';
        options.day = 'numeric';
        options.year = 'numeric';
        break;
      case 'time':
        options.hour = 'numeric';
        options.minute = '2-digit';
        break;
      case 'datetime':
        options.month = 'short';
        options.day = 'numeric';
        options.year = 'numeric';
        options.hour = 'numeric';
        options.minute = '2-digit';
        break;
    }
    
    return new Intl.DateTimeFormat('en-US', options).format(date);
  }
}
