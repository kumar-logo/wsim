import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

@Component({
  selector: 'app-date-range-picker',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="flex flex-col sm:flex-row gap-3">
      <div class="flex-1">
        <label class="label">{{ startLabel }}</label>
        <input 
          type="date"
          [ngModel]="startDateStr"
          (ngModelChange)="onStartDateChange($event)"
          [max]="endDateStr"
          class="input">
      </div>
      <div class="flex-1">
        <label class="label">{{ endLabel }}</label>
        <input 
          type="date"
          [ngModel]="endDateStr"
          (ngModelChange)="onEndDateChange($event)"
          [min]="startDateStr"
          class="input">
      </div>
    </div>
    
    @if (showPresets) {
      <div class="flex flex-wrap gap-2 mt-3">
        @for (preset of presets; track preset.label) {
          <button 
            type="button"
            (click)="applyPreset(preset)"
            class="px-3 py-1 text-xs font-medium rounded-full transition-colors"
            [ngClass]="isActivePreset(preset) ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600'">
            {{ preset.label }}
          </button>
        }
      </div>
    }
  `
})
export class DateRangePickerComponent {
  @Input() startLabel = 'Start Date';
  @Input() endLabel = 'End Date';
  @Input() showPresets = true;
  @Input() 
  set value(range: DateRange) {
    this._startDate = range.startDate;
    this._endDate = range.endDate;
  }

  @Output() valueChange = new EventEmitter<DateRange>();

  private _startDate: Date | null = null;
  private _endDate: Date | null = null;

  presets = [
    { label: 'Today', days: 0 },
    { label: 'Last 7 days', days: 7 },
    { label: 'Last 30 days', days: 30 },
    { label: 'Last 90 days', days: 90 },
    { label: 'This Year', days: -1 },
    { label: 'Last Year', days: -2 }
  ];

  get startDateStr(): string {
    return this._startDate ? this.formatDate(this._startDate) : '';
  }

  get endDateStr(): string {
    return this._endDate ? this.formatDate(this._endDate) : '';
  }

  onStartDateChange(dateStr: string): void {
    this._startDate = dateStr ? new Date(dateStr) : null;
    this.emitChange();
  }

  onEndDateChange(dateStr: string): void {
    this._endDate = dateStr ? new Date(dateStr) : null;
    this.emitChange();
  }

  applyPreset(preset: { label: string; days: number }): void {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (preset.days === 0) {
      this._startDate = today;
      this._endDate = today;
    } else if (preset.days === -1) {
      this._startDate = new Date(today.getFullYear(), 0, 1);
      this._endDate = today;
    } else if (preset.days === -2) {
      this._startDate = new Date(today.getFullYear() - 1, 0, 1);
      this._endDate = new Date(today.getFullYear() - 1, 11, 31);
    } else {
      this._startDate = new Date(today.getTime() - preset.days * 24 * 60 * 60 * 1000);
      this._endDate = today;
    }

    this.emitChange();
  }

  isActivePreset(preset: { label: string; days: number }): boolean {
    return false;
  }

  private emitChange(): void {
    this.valueChange.emit({
      startDate: this._startDate,
      endDate: this._endDate
    });
  }

  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }
}
