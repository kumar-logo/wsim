export interface Client {
  id: string;
  clientCode: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth?: Date;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  accountType: AccountType;
  riskProfile: RiskProfile;
  investmentObjective: InvestmentObjective;
  annualIncome?: number;
  netWorth?: number;
  employmentStatus?: EmploymentStatus;
  employer?: string;
  occupation?: string;
  taxId?: string;
  bankAccount?: BankAccount;
  nominee?: Nominee;
  documents?: ClientDocument[];
  portfolioValue: number;
  totalInvested: number;
  totalReturns: number;
  returnPercentage: number;
  status: ClientStatus;
  assignedEmployee?: string;
  createdAt: Date;
  updatedAt: Date;
  lastActivityDate?: Date;
  notes?: string;
}

export interface BankAccount {
  bankName: string;
  accountNumber: string;
  accountType: string;
  ifscCode?: string;
  routingNumber?: string;
}

export interface Nominee {
  name: string;
  relationship: string;
  dateOfBirth?: Date;
  phone?: string;
  email?: string;
  address?: string;
  percentage: number;
}

export interface ClientDocument {
  id: string;
  type: DocumentType;
  name: string;
  url: string;
  uploadedAt: Date;
  verified: boolean;
}

export enum AccountType {
  INDIVIDUAL = 'individual',
  JOINT = 'joint',
  CORPORATE = 'corporate',
  TRUST = 'trust',
  IRA = 'ira',
  RETIREMENT = 'retirement'
}

export enum RiskProfile {
  CONSERVATIVE = 'conservative',
  MODERATE = 'moderate',
  AGGRESSIVE = 'aggressive',
  VERY_AGGRESSIVE = 'very_aggressive'
}

export enum InvestmentObjective {
  GROWTH = 'growth',
  INCOME = 'income',
  BALANCED = 'balanced',
  PRESERVATION = 'preservation',
  SPECULATION = 'speculation'
}

export enum EmploymentStatus {
  EMPLOYED = 'employed',
  SELF_EMPLOYED = 'self_employed',
  RETIRED = 'retired',
  UNEMPLOYED = 'unemployed',
  STUDENT = 'student'
}

export enum DocumentType {
  ID_PROOF = 'id_proof',
  ADDRESS_PROOF = 'address_proof',
  BANK_STATEMENT = 'bank_statement',
  TAX_RETURN = 'tax_return',
  INCOME_PROOF = 'income_proof',
  OTHER = 'other'
}

export enum ClientStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PENDING = 'pending',
  SUSPENDED = 'suspended',
  CLOSED = 'closed'
}

export interface ClientFilter {
  search?: string;
  status?: ClientStatus;
  accountType?: AccountType;
  riskProfile?: RiskProfile;
  assignedEmployee?: string;
  minPortfolioValue?: number;
  maxPortfolioValue?: number;
  dateFrom?: Date;
  dateTo?: Date;
}

export interface ClientStats {
  totalClients: number;
  activeClients: number;
  newClientsThisMonth: number;
  averagePortfolioValue: number;
  clientsByRiskProfile: { [key: string]: number };
  clientsByAccountType: { [key: string]: number };
}
