import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ClientService } from '../../../core/services/client.service';
import { Client } from '../../../core/models/client.model';
import { CurrencyFormatPipe } from '../../../shared/pipes/currency-format.pipe';
import { ToasterService } from '../../../core/services/toaster.service';

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, CurrencyFormatPipe],
  templateUrl: './client-list.component.html',
})
export class ClientListComponent implements OnInit {
  clients = signal<Client[]>([]);
  filteredClients = signal<Client[]>([]);
  searchTerm = signal<string>('');
  selectedStatus = signal<string>('all');
  sortField = signal<string>('name');
  sortDirection = signal<'asc' | 'desc'>('asc');
  isLoading = signal<boolean>(true);
  viewMode = signal<'table' | 'grid'>('table');
  selectedClients = signal<Set<string>>(new Set());
  showDeleteModal = signal<boolean>(false);
  clientToDelete = signal<Client | null>(null);
  currentPage = signal<number>(1);
  itemsPerPage = signal<number>(10);

  totalClients = computed(() => this.clients().length);
  activeClients = computed(() => this.clients().filter(c => c.status === 'active').length);
  totalAUM = computed(() => this.clients().reduce((sum, c) => sum + (c.portfolioValue || 0), 0));

  paginatedClients = computed(() => {
    const start = (this.currentPage() - 1) * this.itemsPerPage();
    const end = start + this.itemsPerPage();
    return this.filteredClients().slice(start, end);
  });
  

  totalPages = computed(() => Math.ceil(this.filteredClients().length / this.itemsPerPage()));

  statusOptions = [
    { value: 'all', label: 'All Status', color: 'bg-slate-500' },
    { value: 'active', label: 'Active', color: 'bg-emerald-500' },
    { value: 'pending', label: 'Pending', color: 'bg-amber-500' },
    { value: 'inactive', label: 'Inactive', color: 'bg-red-500' }
  ];

  constructor(
    private clientService: ClientService,
    private toasterService: ToasterService
  ) { }

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.isLoading.set(true);
    this.clientService.getClients().subscribe({
      next: (clients) => {
        this.clients.set(clients);
        this.applyFilters();
        this.isLoading.set(false);
      },
      error: () => {
        this.toasterService.error('Failed to load clients');
        this.isLoading.set(false);
      }
    });
  }

  applyFilters(): void {
    let result = [...this.clients()];

    const term = this.searchTerm().toLowerCase();
    if (term) {
      result = result.filter(c =>
        c.firstName.toLowerCase().includes(term) ||
        c.lastName.toLowerCase().includes(term) ||
        c.email.toLowerCase().includes(term) ||
        c.clientCode.toLowerCase().includes(term)
      );
    }

    if (this.selectedStatus() !== 'all') {
      result = result.filter(c => c.status === this.selectedStatus());
    }

    result.sort((a, b) => {
      let aVal: any, bVal: any;
      switch (this.sortField()) {
        case 'name':
          aVal = `${a.firstName} ${a.lastName}`;
          bVal = `${b.firstName} ${b.lastName}`;
          break;
        case 'portfolioValue':
          aVal = a.portfolioValue;
          bVal = b.portfolioValue;
          break;
        case 'returnPercentage':
          aVal = a.returnPercentage;
          bVal = b.returnPercentage;
          break;
        default:
          aVal = a.firstName;
          bVal = b.firstName;
      }

      if (this.sortDirection() === 'asc') {
        return aVal > bVal ? 1 : -1;
      }
      return aVal < bVal ? 1 : -1;
    });

    this.filteredClients.set(result);
    this.currentPage.set(1);
  }

  onSearchChange(term: string): void {
    this.searchTerm.set(term);
    this.applyFilters();
  }

  onStatusChange(status: string): void {
    this.selectedStatus.set(status);
    this.applyFilters();
  }

  onSort(field: string): void {
    if (this.sortField() === field) {
      this.sortDirection.set(this.sortDirection() === 'asc' ? 'desc' : 'asc');
    } else {
      this.sortField.set(field);
      this.sortDirection.set('asc');
    }
    this.applyFilters();
  }

  toggleSelectClient(clientId: string): void {
    const selected = new Set(this.selectedClients());
    if (selected.has(clientId)) {
      selected.delete(clientId);
    } else {
      selected.add(clientId);
    }
    this.selectedClients.set(selected);
  }

  toggleSelectAll(): void {
    if (this.selectedClients().size === this.paginatedClients().length) {
      this.selectedClients.set(new Set());
    } else {
      this.selectedClients.set(new Set(this.paginatedClients().map(c => c.id)));
    }
  }

  isSelected(clientId: string): boolean {
    return this.selectedClients().has(clientId);
  }

  isAllSelected(): boolean {
    return this.paginatedClients().length > 0 &&
      this.selectedClients().size === this.paginatedClients().length;
  }

  confirmDelete(client: Client): void {
    this.clientToDelete.set(client);
    this.showDeleteModal.set(true);
  }

  cancelDelete(): void {
    this.showDeleteModal.set(false);
    this.clientToDelete.set(null);
  }

  deleteClient(): void {
    const client = this.clientToDelete();
    if (!client) return;

    this.clientService.deleteClient(client.id).subscribe({
      next: () => {
        this.toasterService.success(`Client ${client.firstName} ${client.lastName} deleted successfully`);
        this.showDeleteModal.set(false);
        this.clientToDelete.set(null);
        this.loadClients();
      },
      error: () => {
        this.toasterService.error('Failed to delete client');
      }
    });
  }

  bulkDelete(): void {
    const selectedIds = Array.from(this.selectedClients());
    if (selectedIds.length === 0) return;

    if (confirm(`Delete ${selectedIds.length} selected clients?`)) {
      this.toasterService.success(`${selectedIds.length} clients deleted`);
      this.selectedClients.set(new Set());
      this.loadClients();
    }
  }

  exportClients(): void {
    const data = this.clients().map(c => ({
      Code: c.clientCode,
      Name: `${c.firstName} ${c.lastName}`,
      Email: c.email,
      Status: c.status,
      Portfolio: c.portfolioValue,
      Returns: c.returnPercentage
    }));

    const csv = [
      Object.keys(data[0]).join(','),
      ...data.map(row => Object.values(row).join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `clients-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);

    this.toasterService.success('Clients exported successfully');
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
    }
  }

  getStatusColor(status: string): string {
    const colors: Record<string, string> = {
      active: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400',
      pending: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400',
      inactive: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
    };
    return colors[status] || colors['pending'];
  }

  clearSelection(): void {
    this.selectedClients.set(new Set());
  }

}