import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClientService } from '../../../core/services/client.service';
import { ToasterService } from '../../../core/services/toaster.service';

@Component({
  selector: 'app-client-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './client-create.component.html',
})
export class ClientCreateComponent implements OnInit {
  clientForm!: FormGroup;
  isSubmitting = signal<boolean>(false);
  currentStep = signal<number>(1);
  totalSteps = 3;

  accountTypes = ['Individual', 'Joint', 'Corporate', 'Trust', 'IRA', 'Retirement'];
  riskProfiles = ['Conservative', 'Moderate', 'Aggressive', 'Very Aggressive'];
  countries = ['United States', 'Canada', 'United Kingdom', 'Australia', 'Germany', 'France', 'Japan', 'Singapore'];

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private toasterService: ToasterService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.clientForm = this.fb.group({
      // Step 1: Personal Information
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\+?[\d\s-]{10,}$/)]],
      dateOfBirth: ['', Validators.required],
      
      // Step 2: Account Details
      accountType: ['Individual', Validators.required],
      riskProfile: ['Moderate', Validators.required],
      investmentGoal: ['', Validators.required],
      initialInvestment: [0, [Validators.required, Validators.min(1000)]],
      
      // Step 3: Address & Additional
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required],
      country: ['United States', Validators.required],
      notes: ['']
    });
  }

  get formControls() {
    return this.clientForm.controls;
  }

  isStepValid(step: number): boolean {
    switch (step) {
      case 1:
        return this.formControls['firstName'].valid &&
               this.formControls['lastName'].valid &&
               this.formControls['email'].valid &&
               this.formControls['phone'].valid &&
               this.formControls['dateOfBirth'].valid;
      case 2:
        return this.formControls['accountType'].valid &&
               this.formControls['riskProfile'].valid &&
               this.formControls['investmentGoal'].valid &&
               this.formControls['initialInvestment'].valid;
      case 3:
        return this.formControls['address'].valid &&
               this.formControls['city'].valid &&
               this.formControls['state'].valid &&
               this.formControls['zipCode'].valid &&
               this.formControls['country'].valid;
      default:
        return false;
    }
  }

  nextStep(): void {
    if (this.currentStep() < this.totalSteps && this.isStepValid(this.currentStep())) {
      this.currentStep.set(this.currentStep() + 1);
    }
  }

  prevStep(): void {
    if (this.currentStep() > 1) {
      this.currentStep.set(this.currentStep() - 1);
    }
  }

  goToStep(step: number): void {
    if (step <= this.currentStep() || this.isStepValid(this.currentStep())) {
      this.currentStep.set(step);
    }
  }

  onSubmit(): void {
    if (this.clientForm.invalid) {
      this.clientForm.markAllAsTouched();
      this.toasterService.error('Please fill all required fields correctly');
      return;
    }

    this.isSubmitting.set(true);
    
    const clientData = {
      ...this.clientForm.value,
      clientCode: this.generateClientCode(),
      status: 'pending',
      portfolioValue: this.clientForm.value.initialInvestment,
      returnPercentage: 0,
      createdAt: new Date().toISOString()
    };

    this.clientService.createClient(clientData).subscribe({
      next: (client) => {
        this.toasterService.success('Client created successfully!');
        this.router.navigate(['/admin/clients', client.id]);
      },
      error: (error) => {
        this.toasterService.error('Failed to create client');
        this.isSubmitting.set(false);
      }
    });
  }

  private generateClientCode(): string {
    const prefix = 'CLT';
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `${prefix}-${timestamp}-${random}`;
  }

  getFieldError(fieldName: string): string {
    const field = this.formControls[fieldName];
    if (field?.errors && field.touched) {
      if (field.errors['required']) return `${this.formatFieldName(fieldName)} is required`;
      if (field.errors['email']) return 'Please enter a valid email';
      if (field.errors['minlength']) return `Minimum ${field.errors['minlength'].requiredLength} characters required`;
      if (field.errors['min']) return `Minimum value is ${field.errors['min'].min}`;
      if (field.errors['pattern']) return 'Invalid format';
    }
    return '';
  }

  private formatFieldName(fieldName: string): string {
    return fieldName.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
  }
}