import { Injectable, signal } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Client, ClientStatus, AccountType, RiskProfile, InvestmentObjective, ClientStats } from '../models/client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private mockClients: Client[] = [
    {
      id: '1', clientCode: 'CLI001', firstName: 'kumar', lastName: 'kumar',
      email: 'gnanakumar@email.com', phone: '91 9962002342',
      address: 'test', city: 'test', state: 'NY', zipCode: '10022', country: 'INDIA',
      accountType: AccountType.INDIVIDUAL, riskProfile: RiskProfile.MODERATE,
      investmentObjective: InvestmentObjective.GROWTH, annualIncome: 0, netWorth: 0,
      portfolioValue: 0, totalInvested: 0, totalReturns: 0, returnPercentage: 0,
      status: ClientStatus.ACTIVE, assignedEmployee: '3',
      createdAt: new Date('2023-01-15'), updatedAt: new Date()
    },
   
    {
      id: '2', clientCode: 'CLI002', firstName: 'kumar', lastName: 'kumar',
      email: 'gnanakumar@email.com', phone: '91 9962002342',
      address: 'test', city: 'test', state: 'NY', zipCode: '10022', country: 'INDIA',
      accountType: AccountType.INDIVIDUAL, riskProfile: RiskProfile.MODERATE,
      investmentObjective: InvestmentObjective.GROWTH, annualIncome: 0, netWorth: 0,
      portfolioValue: 0, totalInvested: 0, totalReturns: 0, returnPercentage: 0,
      status: ClientStatus.PENDING, assignedEmployee: '3',
      createdAt: new Date('2023-01-15'), updatedAt: new Date()
    },
  ];

  private clientsSignal = signal<Client[]>(this.mockClients);
  readonly clients = this.clientsSignal.asReadonly();

  getClients(): Observable<Client[]> {
    return of(this.mockClients).pipe(delay(500));
  }

  getClient(id: string): Observable<Client | undefined> {
    return of(this.mockClients.find(c => c.id === id)).pipe(delay(300));
  }

  createClient(client: Partial<Client>): Observable<Client> {
    const newClient: Client = {
      ...client as Client,
      id: String(this.mockClients.length + 1),
      clientCode: `CLI00${this.mockClients.length + 1}`,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.mockClients.push(newClient);
    this.clientsSignal.set([...this.mockClients]);
    return of(newClient).pipe(delay(500));
  }

  updateClient(id: string, client: Partial<Client>): Observable<Client> {
    const index = this.mockClients.findIndex(c => c.id === id);
    if (index !== -1) {
      this.mockClients[index] = { ...this.mockClients[index], ...client, updatedAt: new Date() };
      this.clientsSignal.set([...this.mockClients]);
      return of(this.mockClients[index]).pipe(delay(500));
    }
    return of(client as Client).pipe(delay(500));
  }

  deleteClient(id: string): Observable<boolean> {
    this.mockClients = this.mockClients.filter(c => c.id !== id);
    this.clientsSignal.set([...this.mockClients]);
    return of(true).pipe(delay(500));
  }

  getStats(): Observable<ClientStats> {
    const stats: ClientStats = {
      totalClients: this.mockClients.length,
      activeClients: this.mockClients.filter(c => c.status === ClientStatus.ACTIVE).length,
      newClientsThisMonth: 2,
      averagePortfolioValue: this.mockClients.reduce((sum, c) => sum + c.portfolioValue, 0) / this.mockClients.length,
      clientsByRiskProfile: {
        conservative: 2, moderate: 2, aggressive: 1
      },
      clientsByAccountType: {
        individual: 2, joint: 1, corporate: 1, retirement: 1
      }
    };
    return of(stats).pipe(delay(300));
  }
}
