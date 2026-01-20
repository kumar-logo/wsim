export interface Report {
  id: string;
  name: string;
  type: ReportType;
  description?: string;
  parameters: ReportParameter[];
  createdBy: string;
  createdAt: Date;
  lastRunAt?: Date;
  schedule?: ReportSchedule;
  format: ReportFormat;
  status: ReportStatus;
}

export interface ReportParameter {
  name: string;
  displayName: string;
  type: ParameterType;
  required: boolean;
  defaultValue?: any;
  options?: ParameterOption[];
}

export interface ParameterOption {
  label: string;
  value: any;
}

export interface ReportSchedule {
  enabled: boolean;
  frequency: ScheduleFrequency;
  time: string;
  dayOfWeek?: number;
  dayOfMonth?: number;
  recipients: string[];
}

export interface ReportResult {
  id: string;
  reportId: string;
  reportName: string;
  generatedAt: Date;
  generatedBy: string;
  parameters: { [key: string]: any };
  data: any;
  format: ReportFormat;
  fileUrl?: string;
  status: ReportStatus;
  error?: string;
}

export interface PerformanceReport {
  clientId?: string;
  clientName?: string;
  startDate: Date;
  endDate: Date;
  startingValue: number;
  endingValue: number;
  netContributions: number;
  netWithdrawals: number;
  realizedGains: number;
  unrealizedGains: number;
  dividends: number;
  fees: number;
  totalReturn: number;
  totalReturnPercent: number;
  annualizedReturn: number;
  benchmarkReturn?: number;
  alpha?: number;
  beta?: number;
  sharpeRatio?: number;
  maxDrawdown?: number;
  volatility?: number;
  performanceByPeriod: PeriodPerformance[];
  performanceByAssetClass: AssetClassPerformance[];
  topContributors: PositionContribution[];
  bottomContributors: PositionContribution[];
}

export interface PeriodPerformance {
  period: string;
  startDate: Date;
  endDate: Date;
  startValue: number;
  endValue: number;
  return: number;
  returnPercent: number;
  benchmark?: number;
}

export interface AssetClassPerformance {
  assetClass: string;
  startValue: number;
  endValue: number;
  weight: number;
  return: number;
  returnPercent: number;
  contribution: number;
}

export interface PositionContribution {
  symbol: string;
  name: string;
  return: number;
  returnPercent: number;
  contribution: number;
  weight: number;
}

export enum ReportType {
  PERFORMANCE = 'performance',
  HOLDINGS = 'holdings',
  TRANSACTIONS = 'transactions',
  TAX = 'tax',
  COMPLIANCE = 'compliance',
  CLIENT_SUMMARY = 'client_summary',
  PORTFOLIO_ANALYSIS = 'portfolio_analysis',
  RISK_ANALYSIS = 'risk_analysis',
  ATTRIBUTION = 'attribution',
  CUSTOM = 'custom'
}

export enum ReportFormat {
  PDF = 'pdf',
  EXCEL = 'excel',
  CSV = 'csv',
  HTML = 'html',
  JSON = 'json'
}

export enum ReportStatus {
  PENDING = 'pending',
  GENERATING = 'generating',
  COMPLETED = 'completed',
  FAILED = 'failed'
}

export enum ParameterType {
  STRING = 'string',
  NUMBER = 'number',
  DATE = 'date',
  DATE_RANGE = 'date_range',
  SELECT = 'select',
  MULTI_SELECT = 'multi_select',
  BOOLEAN = 'boolean',
  CLIENT = 'client'
}

export enum ScheduleFrequency {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  QUARTERLY = 'quarterly',
  ANNUALLY = 'annually'
}
