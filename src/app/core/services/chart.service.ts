import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';

export interface ChartData {
  labels: string[];
  datasets: ChartDataset[];
}

export interface ChartDataset {
  label: string;
  data: number[];
  backgroundColor?: string | string[];
  borderColor?: string;
  fill?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  getAssetAllocationData(): Observable<ChartData> {
    return of({
      labels: ['Equity', 'ETF', 'Fixed Income', 'Cash', 'Alternative'],
      datasets: [{
        label: 'Asset Allocation',
        data: [62.5, 27.2, 8.1, 2.2, 0],
        backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#6366f1', '#ec4899']
      }]
    }).pipe(delay(300));
  }

  getPerformanceData(period: string = '1Y'): Observable<ChartData> {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return of({
      labels: months,
      datasets: [
        {
          label: 'Portfolio',
          data: [100, 102, 105, 103, 108, 112, 115, 118, 116, 120, 125, 128],
          borderColor: '#3b82f6',
          fill: false
        },
        {
          label: 'S&P 500',
          data: [100, 101, 103, 102, 105, 108, 110, 112, 111, 114, 118, 120],
          borderColor: '#94a3b8',
          fill: false
        }
      ]
    }).pipe(delay(300));
  }

  getSectorAllocationData(): Observable<ChartData> {
    return of({
      labels: ['Technology', 'Healthcare', 'Finance', 'Consumer', 'Energy', 'Other'],
      datasets: [{
        label: 'Sector Allocation',
        data: [45, 15, 12, 10, 8, 10],
        backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6', '#6366f1']
      }]
    }).pipe(delay(300));
  }

  getMonthlyReturnsData(): Observable<ChartData> {
    return of({
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [{
        label: 'Monthly Returns %',
        data: [2.1, 1.8, -0.5, 2.3, 1.5, 3.2, 2.8, -1.2, 1.9, 2.5, 3.1, 2.4],
        backgroundColor: '#3b82f6'
      }]
    }).pipe(delay(300));
  }
}
