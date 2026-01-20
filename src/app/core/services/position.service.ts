import { Injectable, signal } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Position, PositionStatus, AssetClass, PositionSummary, AssetAllocation } from '../models/position.model';

@Injectable({
  providedIn: 'root'
})
export class PositionService {
  private mockPositions: Position[] = [
    {
      id: '1', clientId: '1', clientName: 'Michael Johnson', symbol: 'AAPL', name: 'Apple Inc.',
      assetClass: AssetClass.EQUITY, sector: 'Technology', exchange: 'NASDAQ', currency: 'USD',
      quantity: 500, averageCost: 150.00, currentPrice: 178.50, marketValue: 89250,
      unrealizedPnL: 14250, unrealizedPnLPercent: 19.0, realizedPnL: 0, totalPnL: 14250,
      weight: 7.14, openDate: new Date('2023-06-15'), status: PositionStatus.OPEN,
      transactions: [], lastUpdated: new Date()
    },
    {
      id: '2', clientId: '1', clientName: 'Michael Johnson', symbol: 'MSFT', name: 'Microsoft Corp.',
      assetClass: AssetClass.EQUITY, sector: 'Technology', exchange: 'NASDAQ', currency: 'USD',
      quantity: 300, averageCost: 280.00, currentPrice: 378.90, marketValue: 113670,
      unrealizedPnL: 29670, unrealizedPnLPercent: 35.3, realizedPnL: 0, totalPnL: 29670,
      weight: 9.09, openDate: new Date('2023-05-10'), status: PositionStatus.OPEN,
      transactions: [], lastUpdated: new Date()
    },
    {
      id: '3', clientId: '1', clientName: 'Michael Johnson', symbol: 'GOOGL', name: 'Alphabet Inc.',
      assetClass: AssetClass.EQUITY, sector: 'Technology', exchange: 'NASDAQ', currency: 'USD',
      quantity: 200, averageCost: 120.00, currentPrice: 141.80, marketValue: 28360,
      unrealizedPnL: 4360, unrealizedPnLPercent: 18.2, realizedPnL: 0, totalPnL: 4360,
      weight: 2.27, openDate: new Date('2023-07-20'), status: PositionStatus.OPEN,
      transactions: [], lastUpdated: new Date()
    },
    {
      id: '4', clientId: '2', clientName: 'Sarah Williams', symbol: 'VTI', name: 'Vanguard Total Stock Market ETF',
      assetClass: AssetClass.ETF, sector: 'Diversified', exchange: 'NYSE', currency: 'USD',
      quantity: 400, averageCost: 200.00, currentPrice: 238.50, marketValue: 95400,
      unrealizedPnL: 15400, unrealizedPnLPercent: 19.3, realizedPnL: 0, totalPnL: 15400,
      weight: 10.9, openDate: new Date('2023-04-05'), status: PositionStatus.OPEN,
      transactions: [], lastUpdated: new Date()
    },
    {
      id: '5', clientId: '2', clientName: 'Sarah Williams', symbol: 'BND', name: 'Vanguard Total Bond Market ETF',
      assetClass: AssetClass.FIXED_INCOME, sector: 'Bonds', exchange: 'NYSE', currency: 'USD',
      quantity: 1000, averageCost: 72.00, currentPrice: 71.50, marketValue: 71500,
      unrealizedPnL: -500, unrealizedPnLPercent: -0.7, realizedPnL: 0, totalPnL: -500,
      weight: 8.17, openDate: new Date('2023-03-15'), status: PositionStatus.OPEN,
      transactions: [], lastUpdated: new Date()
    },
    {
      id: '6', clientId: '3', clientName: 'David Chen', symbol: 'NVDA', name: 'NVIDIA Corporation',
      assetClass: AssetClass.EQUITY, sector: 'Technology', exchange: 'NASDAQ', currency: 'USD',
      quantity: 250, averageCost: 450.00, currentPrice: 875.30, marketValue: 218825,
      unrealizedPnL: 106325, unrealizedPnLPercent: 94.5, realizedPnL: 0, totalPnL: 106325,
      weight: 8.75, openDate: new Date('2023-02-28'), status: PositionStatus.OPEN,
      transactions: [], lastUpdated: new Date()
    },
    {
      id: '7', clientId: '3', clientName: 'David Chen', symbol: 'TSLA', name: 'Tesla Inc.',
      assetClass: AssetClass.EQUITY, sector: 'Automotive', exchange: 'NASDAQ', currency: 'USD',
      quantity: 400, averageCost: 200.00, currentPrice: 248.50, marketValue: 99400,
      unrealizedPnL: 19400, unrealizedPnLPercent: 24.3, realizedPnL: 0, totalPnL: 19400,
      weight: 3.98, openDate: new Date('2023-08-10'), status: PositionStatus.OPEN,
      transactions: [], lastUpdated: new Date()
    },
    {
      id: '8', clientId: '4', clientName: 'Emily Davis', symbol: 'SPY', name: 'SPDR S&P 500 ETF',
      assetClass: AssetClass.ETF, sector: 'Diversified', exchange: 'NYSE', currency: 'USD',
      quantity: 300, averageCost: 420.00, currentPrice: 478.20, marketValue: 143460,
      unrealizedPnL: 17460, unrealizedPnLPercent: 13.9, realizedPnL: 0, totalPnL: 17460,
      weight: 22.07, openDate: new Date('2023-01-20'), status: PositionStatus.OPEN,
      transactions: [], lastUpdated: new Date()
    }
  ];

  private positionsSignal = signal<Position[]>(this.mockPositions);
  readonly positions = this.positionsSignal.asReadonly();

  getPositions(clientId?: string): Observable<Position[]> {
    const filtered = clientId ? this.mockPositions.filter(p => p.clientId === clientId) : this.mockPositions;
    return of(filtered).pipe(delay(500));
  }

  getOpenPositions(clientId?: string): Observable<Position[]> {
    let filtered = this.mockPositions.filter(p => p.status === PositionStatus.OPEN);
    if (clientId) filtered = filtered.filter(p => p.clientId === clientId);
    return of(filtered).pipe(delay(500));
  }

  getClosedPositions(clientId?: string): Observable<Position[]> {
    let filtered = this.mockPositions.filter(p => p.status === PositionStatus.CLOSED);
    if (clientId) filtered = filtered.filter(p => p.clientId === clientId);
    return of(filtered).pipe(delay(500));
  }

  getPosition(id: string): Observable<Position | undefined> {
    return of(this.mockPositions.find(p => p.id === id)).pipe(delay(300));
  }

  getSummary(clientId?: string): Observable<PositionSummary> {
    const positions = clientId ? this.mockPositions.filter(p => p.clientId === clientId) : this.mockPositions;
    const totalMarketValue = positions.reduce((sum, p) => sum + p.marketValue, 0);
    const assetAllocation: AssetAllocation[] = [
      { assetClass: AssetClass.EQUITY, value: 549505, weight: 62.5, count: 5 },
      { assetClass: AssetClass.ETF, value: 238860, weight: 27.2, count: 2 },
      { assetClass: AssetClass.FIXED_INCOME, value: 71500, weight: 8.1, count: 1 },
      { assetClass: AssetClass.CASH, value: 19135, weight: 2.2, count: 1 }
    ];
    const summary: PositionSummary = {
      totalPositions: positions.length,
      openPositions: positions.filter(p => p.status === PositionStatus.OPEN).length,
      closedPositions: positions.filter(p => p.status === PositionStatus.CLOSED).length,
      totalMarketValue,
      totalUnrealizedPnL: positions.reduce((sum, p) => sum + p.unrealizedPnL, 0),
      totalRealizedPnL: positions.reduce((sum, p) => sum + p.realizedPnL, 0),
      totalPnL: positions.reduce((sum, p) => sum + p.totalPnL, 0),
      overallReturn: 18.5,
      assetAllocation,
      sectorAllocation: [],
      topGainers: positions.sort((a, b) => b.unrealizedPnLPercent - a.unrealizedPnLPercent).slice(0, 5),
      topLosers: positions.sort((a, b) => a.unrealizedPnLPercent - b.unrealizedPnLPercent).slice(0, 5)
    };
    return of(summary).pipe(delay(300));
  }
}
