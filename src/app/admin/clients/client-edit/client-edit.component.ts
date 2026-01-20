import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClientService } from '../../../core/services/client.service';
import { Client } from '../../../core/models/client.model';
import { ToasterService } from '../../../core/services/toaster.service';

@Component({
  selector: 'app-client-edit',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './client-edit.component.html',
})
export class ClientEditComponent implements OnInit {
  clientForm!: FormGroup;
  client = signal<Client | null>(null);
  isLoading = signal<boolean>(true);
  isSubmitting = signal<boolean>(false);
  activeSection = signal<string>('personal');

  accountTypes = ['Individual', 'Joint', 'Corporate', 'Trust', 'IRA', 'Retirement'];
  riskProfiles = ['Conservative', 'Moderate', 'Aggressive', 'Very Aggressive'];
  statusOptions = ['active', 'pending', 'inactive'];
  countries = ['United States', 'Canada', 'United Kingdom', 'Australia', 'Germany', 'France', 'Japan', 'Singapore'];

  sections = [
    { id: 'personal', label: 'Personal Info', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
    { id: 'account', label: 'Account Details', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
    { id: 'address', label: 'Address', icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' }
  ];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private clientService: ClientService,
    private toasterService: ToasterService
  ) {}

  ngOnInit(): void {
    this.initForm();
    const clientId = this.route.snapshot.paramMap.get('id');
    if (clientId) {
      this.loadClient(clientId);
    }
  }

  private initForm(): void {
    this.clientForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      dateOfBirth: [''],
      accountType: ['Individual', Validators.required],
      riskProfile: ['Moderate', Validators.required],
      status: ['active', Validators.required],
      investmentGoal: [''],
      address: [''],
      city: [''],
      state: [''],
      zipCode: [''],
      country: ['United States'],
      notes: ['']
    });
  }

  loadClient(id: string): void {
    this.isLoading.set(true);
    this.clientService.getClient(id).subscribe({
      next: (client: any) => {
        this.client.set(client);
        this.clientForm.patchValue({
          firstName: client.firstName,
          lastName: client.lastName,
          email: client.email,
          phone: client.phone || '',
          dateOfBirth: client.dateOfBirth || '',
          accountType: client.accountType,
          riskProfile: client.riskProfile || 'Moderate',
          status: client.status,
          investmentGoal: client.investmentGoal || '',
          address: client.address || '',
          city: client.city || '',
          state: client.state || '',
          zipCode: client.zipCode || '',
          country: client.country || 'United States',
          notes: client.notes || ''
        });
        this.isLoading.set(false);
      },
      error: () => {
        this.toasterService.error('Failed to load client');
        this.router.navigate(['/admin/clients']);
      }
    });
  }

  get formControls() {
    return this.clientForm.controls;
  }

  setActiveSection(sectionId: string): void {
    this.activeSection.set(sectionId);
  }

  onSubmit(): void {
    if (this.clientForm.invalid) {
      this.clientForm.markAllAsTouched();
      this.toasterService.error('Please fill all required fields correctly');
      return;
    }

    const client = this.client();
    if (!client) return;

    this.isSubmitting.set(true);

    const updatedClient = {
      ...client,
      ...this.clientForm.value,
      updatedAt: new Date().toISOString()
    };

    this.clientService.updateClient(client.id, updatedClient).subscribe({
      next: () => {
        this.toasterService.success('Client updated successfully!');
        this.router.navigate(['/admin/clients', client.id]);
      },
      error: () => {
        this.toasterService.error('Failed to update client');
        this.isSubmitting.set(false);
      }
    });
  }

  getFieldError(fieldName: string): string {
    const field = this.formControls[fieldName];
    if (field?.errors && field.touched) {
      if (field.errors['required']) return `This field is required`;
      if (field.errors['email']) return 'Please enter a valid email';
      if (field.errors['minlength']) return `Minimum ${field.errors['minlength'].requiredLength} characters`;
    }
    return '';
  }

  hasChanges(): boolean {
    return this.clientForm.dirty;
  }
}