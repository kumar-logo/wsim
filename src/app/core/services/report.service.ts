import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Report, ReportType, ReportFormat, ReportStatus, PerformanceReport } from '../models/report.model';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private mockReports: Report[] = [
    {
      id: '1', name: 'Monthly Performance Report', type: ReportType.PERFORMANCE,
      description: 'Monthly portfolio performance analysis',
      parameters: [], createdBy: '1', createdAt: new Date('2023-01-01'),
      lastRunAt: new Date(), format: ReportFormat.PDF, status: ReportStatus.COMPLETED
    },
    {
      id: '2', name: 'Holdings Summary', type: ReportType.HOLDINGS,
      description: 'Current holdings breakdown',
      parameters: [], createdBy: '1', createdAt: new Date('2023-01-01'),
      format: ReportFormat.EXCEL, status: ReportStatus.COMPLETED
    },
    {
      id: '3', name: 'Transaction History', type: ReportType.TRANSACTIONS,
      description: 'Complete transaction history',
      parameters: [], createdBy: '1', createdAt: new Date('2023-01-01'),
      format: ReportFormat.CSV, status: ReportStatus.COMPLETED
    }
  ];

  getReports(): Observable<Report[]> {
    return of(this.mockReports).pipe(delay(500));
  }

  getReport(id: string): Observable<Report | undefined> {
    return of(this.mockReports.find(r => r.id === id)).pipe(delay(300));
  }

  generatePerformanceReport(clientId?: string, startDate?: Date, endDate?: Date): Observable<PerformanceReport> {
    const report: PerformanceReport = {
      clientId, clientName: clientId ? 'Michael Johnson' : undefined,
      startDate: startDate || new Date('2023-01-01'),
      endDate: endDate || new Date(),
      startingValue: 1000000, endingValue: 1250000,
      netContributions: 50000, netWithdrawals: 25000,
      realizedGains: 75000, unrealizedGains: 175000,
      dividends: 15000, fees: 5000,
      totalReturn: 225000, totalReturnPercent: 22.5,
      annualizedReturn: 18.5, benchmarkReturn: 15.2,
      alpha: 3.3, beta: 0.95, sharpeRatio: 1.45,
      maxDrawdown: -8.5, volatility: 12.3,
      performanceByPeriod: [],
      performanceByAssetClass: [],
      topContributors: [
        { symbol: 'NVDA', name: 'NVIDIA', return: 106325, returnPercent: 94.5, contribution: 8.5, weight: 8.75 },
        { symbol: 'MSFT', name: 'Microsoft', return: 29670, returnPercent: 35.3, contribution: 2.4, weight: 9.09 }
      ],
      bottomContributors: [
        { symbol: 'BND', name: 'Vanguard Bond ETF', return: -500, returnPercent: -0.7, contribution: -0.04, weight: 8.17 }
      ]
    };
    return of(report).pipe(delay(1000));
  }
}
