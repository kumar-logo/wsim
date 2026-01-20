export interface Position {
  id: string;
  clientId: string;
  clientName: string;
  symbol: string;
  name: string;
  assetClass: AssetClass;
  sector?: string;
  exchange?: string;
  currency: string;
  quantity: number;
  averageCost: number;
  currentPrice: number;
  marketValue: number;
  unrealizedPnL: number;
  unrealizedPnLPercent: number;
  realizedPnL: number;
  totalPnL: number;
  weight: number;
  openDate: Date;
  closeDate?: Date;
  status: PositionStatus;
  transactions: Transaction[];
  lastUpdated: Date;
  notes?: string;
}

export interface Transaction {
  id: string;
  positionId: string;
  type: TransactionType;
  quantity: number;
  price: number;
  amount: number;
  fees: number;
  netAmount: number;
  date: Date;
  settledDate?: Date;
  status: TransactionStatus;
  notes?: string;
}

export enum AssetClass {
  EQUITY = 'equity',
  FIXED_INCOME = 'fixed_income',
  MUTUAL_FUND = 'mutual_fund',
  ETF = 'etf',
  COMMODITY = 'commodity',
  FOREX = 'forex',
  CRYPTO = 'crypto',
  REAL_ESTATE = 'real_estate',
  ALTERNATIVE = 'alternative',
  CASH = 'cash'
}

export enum PositionStatus {
  OPEN = 'open',
  CLOSED = 'closed',
  PARTIALLY_CLOSED = 'partially_closed'
}

export enum TransactionType {
  BUY = 'buy',
  SELL = 'sell',
  DIVIDEND = 'dividend',
  SPLIT = 'split',
  TRANSFER_IN = 'transfer_in',
  TRANSFER_OUT = 'transfer_out'
}

export enum TransactionStatus {
  PENDING = 'pending',
  EXECUTED = 'executed',
  SETTLED = 'settled',
  CANCELLED = 'cancelled',
  FAILED = 'failed'
}

export interface PositionFilter {
  search?: string;
  clientId?: string;
  assetClass?: AssetClass;
  status?: PositionStatus;
  symbol?: string;
  sector?: string;
  minValue?: number;
  maxValue?: number;
  dateFrom?: Date;
  dateTo?: Date;
}

export interface PositionSummary {
  totalPositions: number;
  openPositions: number;
  closedPositions: number;
  totalMarketValue: number;
  totalUnrealizedPnL: number;
  totalRealizedPnL: number;
  totalPnL: number;
  overallReturn: number;
  assetAllocation: AssetAllocation[];
  sectorAllocation: SectorAllocation[];
  topGainers: Position[];
  topLosers: Position[];
}

export interface AssetAllocation {
  assetClass: AssetClass;
  value: number;
  weight: number;
  count: number;
}

export interface SectorAllocation {
  sector: string;
  value: number;
  weight: number;
  count: number;
}

export interface PortfolioPerformance {
  date: Date;
  value: number;
  dailyReturn: number;
  cumulativeReturn: number;
  benchmark?: number;
  benchmarkReturn?: number;
}
