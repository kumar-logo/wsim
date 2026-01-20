import { Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

declare const Chart: any;

@Component({
  selector: 'app-chart-container',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card p-6">
      @if (title) {
        <h3 class="text-lg font-semibold text-slate-900 dark:text-white mb-4">{{ title }}</h3>
      }
      <div class="relative" [style.height]="height">
        <canvas #chartCanvas></canvas>
      </div>
      @if (loading) {
        <div class="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-slate-800/80">
          <div class="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      }
    </div>
  `
})
export class ChartContainerComponent implements OnInit, OnChanges, OnDestroy {
  @ViewChild('chartCanvas', { static: true }) chartCanvas!: ElementRef<HTMLCanvasElement>;

  @Input() type: 'line' | 'bar' | 'pie' | 'doughnut' | 'area' = 'line';
  @Input() data: any;
  @Input() options: any = {};
  @Input() title = '';
  @Input() height = '300px';
  @Input() loading = false;

  private chart: any;

  ngOnInit(): void {
    this.initChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ((changes['data'] || changes['type']) && this.chart) {
      this.updateChart();
    }
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  private initChart(): void {
    if (typeof Chart === 'undefined') {
      console.warn('Chart.js is not loaded');
      return;
    }

    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    const defaultOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            usePointStyle: true,
            padding: 20
          }
        }
      }
    };

    this.chart = new Chart(ctx, {
      type: this.type === 'area' ? 'line' : this.type,
      data: this.data || { labels: [], datasets: [] },
      options: { ...defaultOptions, ...this.options }
    });
  }

  private updateChart(): void {
    if (this.chart && this.data) {
      this.chart.data = this.data;
      this.chart.update();
    }
  }
}
